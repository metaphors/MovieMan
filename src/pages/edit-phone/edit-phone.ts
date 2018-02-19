import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';

// import {WilddogProvider} from "../../providers/wilddog/wilddog";

import * as wilddog from "wilddog";

// import {SMS} from "wilddog-sms/lib/sms"

/**
 * Generated class for the EditPhonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-phone',
  templateUrl: 'edit-phone.html',
})
export class EditPhonePage {
  // edit: { phone: string, verification: string };
  phone: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              // public wilddogProvider: WilddogProvider,
              public toastCtrl: ToastController) {
    // this.edit = {phone: '', verification: ''};
    this.phone = '';
  }

  // onSendPhoneVerification() {
  //   let sms = new SMS({appId: this.wilddogProvider.appId, smsKey: this.wilddogProvider.smsKey});
  //   sms.sendCode(this.edit.phone, '100000').then(data => {
  //     console.log(data);
  //   }, error => {
  //     console.log(error);
  //   });
  // }

  onUpdateUserPhone() {
    if (this.phone === '') {
      this.presentToast('输入信息不能为空');
    } else {
      wilddog.auth().currentUser.updatePhone(this.phone).then(() => {
        this.navCtrl.pop().then(value => {
          return value;
        });
      }, error => {
        this.presentToast(error.name + ': ' + error.message);
      });
    }
  }

  presentToast(message: string) {
    let toast = this.toastCtrl.create({message: message, duration: 1500, dismissOnPageChange: true});
    toast.present().then(value => {
      return value;
    });
  }
}
