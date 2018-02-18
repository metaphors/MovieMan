import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, ActionSheetController, ToastController} from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public camera: Camera, public fileTransfer: FileTransfer) {
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
      headers: {}
    };

    let url: string = 'https://sm.ms/api/upload?smfile=' + fileURI;
    console.log(url);

    fileTransferObject.upload(fileURI, url, fileUploadOptions).then(data => {
      console.log(data);
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

  openPage(page: string) {
    this.navCtrl.push(page).then(value => {
      return value;
    });
  }
}
