import {Component} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  Platform,
  ActionSheetController,
  ToastController,
  AlertController
} from 'ionic-angular';

import {Camera, CameraOptions} from "@ionic-native/camera";
import {FileTransfer, FileTransferObject, FileUploadOptions} from '@ionic-native/file-transfer';

import * as wilddog from "wilddog";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  editUserNamePage = 'EditUsernamePage';
  editPhonePage = 'EditPhonePage';
  editPasswordPage = 'EditPasswordPage';

  user: { displayName: string, email: string, emailVerified: boolean, phone: string, phoneVerified: boolean, photoURL: string };

  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public alertCtrl: AlertController, public platform: Platform, public camera: Camera, public fileTransfer: FileTransfer) {
    this.user = {displayName: '', email: '', emailVerified: false, phone: '', phoneVerified: false, photoURL: ''};
  }

  ionViewWillEnter() {
    this.getUserData();
  }

  getUserData() {
    wilddog.auth().onAuthStateChanged(user => {
      if (user !== null) {
        this.user = {
          displayName: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
          phone: user.phone,
          phoneVerified: user.phoneVerified,
          photoURL: user.photoURL
        };
      }
    });
  }

  getPictureAndUpload(sourceType: number) {
    const cameraOptions: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: sourceType,
      allowEdit: true,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 200,
      targetHeight: 200,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: true,
      cameraDirection: this.camera.Direction.BACK
    };

    this.camera.getPicture(cameraOptions).then(image => {
      this.onUploadPicture(image);
    }, error => {
      console.log(error);
    });
  }

  onUploadPicture(fileURI: string) {
    const fileTransferObject: FileTransferObject = this.fileTransfer.create();

    const fileUploadOptions: FileUploadOptions = {
      fileKey: 'file',
      fileName: 'avatar.jpg',
      httpMethod: 'POST',
      mimeType: 'image/jpeg',
      params: {},
      chunkedMode: true,
      headers: {'Content-Type': 'multipart/form-data'}
    };

    let url: string = 'https://sm.ms/api/upload?smfile=' + fileURI;

    fileTransferObject.upload(fileURI, url, fileUploadOptions).then(data => {
      console.log(data["response"]);
      wilddog.auth().onAuthStateChanged(user => {
        user.updateProfile({'photoURL': JSON.parse(data["response"])["data"]["url"]}).then(() => {
          this.getUserData();
        }, error => {
          this.presentToast(error.name + ': ' + error.message);
        });
      });
    }, error => {
      console.log(error);
    });
  }

  presentChangeAvatarActionSheet() {
    if (!this.platform.is('cordova')) {
      this.presentToast('更换头像功能暂未开通...');
    } else {
      let changeAvatarActionSheet = this.actionSheetCtrl.create({
        title: '更换头像', buttons: [{
          text: '相册', handler: () => {
            this.getPictureAndUpload(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        }, {
          text: '拍照', handler: () => {
            this.getPictureAndUpload(this.camera.PictureSourceType.CAMERA);
          }
        }, {text: '取消', role: 'cancel'}]
      });
      changeAvatarActionSheet.present().then(value => {
        return value;
      });
    }
  }

  presentToast(message: string) {
    let toast = this.toastCtrl.create({message: message, duration: 1500, dismissOnPageChange: true});
    toast.present().then(value => {
      return value;
    });
  }

  presentReauthenticateAlertAndDeleteAccountAlert() {
    let reauthenticateAlert = this.alertCtrl.create({
      title: '&nbsp;',
      subTitle: '若要注销您的账户，需要重新验证您的身份。',
      inputs: [{
        type: 'password',
        name: 'password',
        placeholder: '请输入您的密码'
      }],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
        },
        {
          text: '确认',
          handler: (inputs) => {
            if (inputs.password === '') {
              this.presentToast('密码不能为空');
            } else {
              wilddog.auth().currentUser.reauthenticate(wilddog.auth.WilddogAuthProvider.emailCredential(this.user.email, inputs.password)).then(() => {
                let deleteAccountAlert = this.alertCtrl.create({
                  title: '⚠️&nbsp;警告！！！',
                  subTitle: '该操作不可逆，若注销您的账户，您的所有信息将被删除且无法恢复！！！',
                  message: '是否确认注销此账户？',
                  buttons: [
                    {
                      text: '取消',
                      role: 'cancel'
                    },
                    {
                      text: '注销',
                      cssClass: 'alert-button-warning',
                      handler: () => {
                        wilddog.auth().currentUser.delete().then(() => {
                            this.navCtrl.popToRoot().then(value => {
                              return value;
                            });
                          }, error => {
                            this.presentToast(error.name + ': ' + error.message);
                          }
                        );
                      }
                    }
                  ]
                });
                deleteAccountAlert.present().then(value => {
                  return value;
                });
              }, error => {
                this.presentToast(error.name + ': ' + error.message);
              });
            }
          }
        }
      ]
    });
    reauthenticateAlert.present().then(value => {
      return value;
    });
  }

  presentReauthenticateAlertAndOpenPage(page: string) {
    let subTitle: string;

    if (page === this.editPhonePage) {
      subTitle = '若要修改您的绑定手机号，需要重新验证您的身份。';
    } else if (page === this.editPasswordPage) {
      subTitle = '若要修改您的账号密码，需要重新验证您的身份。';
    }

    let reauthenticateAlert = this.alertCtrl.create({
      title: '&nbsp;',
      subTitle: subTitle,
      inputs: [{
        type: 'password',
        name: 'password',
        placeholder: '请输入您的密码'
      }],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
        },
        {
          text: '确认',
          handler: (inputs) => {
            if (inputs.password === '') {
              this.presentToast('密码不能为空');
            } else {
              wilddog.auth().currentUser.reauthenticate(wilddog.auth.WilddogAuthProvider.emailCredential(this.user.email, inputs.password)).then(() => {
                this.openPage(page);
              }, error => {
                this.presentToast(error.name + ': ' + error.message);
              });
            }
          }
        }
      ]
    });
    reauthenticateAlert.present().then(value => {
      return value;
    });
  }

  openPage(page: string) {
    this.navCtrl.push(page).then(value => {
      return value;
    });
  }
}
