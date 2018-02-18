import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';

import * as wilddog from "wilddog";

/**
 * Generated class for the EditPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-password',
  templateUrl: 'edit-password.html',
})
export class EditPasswordPage {
  email: string;
  edit: { password: string, verification: string };

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
    this.edit = {password: '', verification: ''};
  }

  onUpdateUserPassword() {
    if (this.edit.password === '' || this.edit.verification === '') {
      this.presentToast('输入信息不能为空');
    } else if (this.edit.password !== this.edit.verification) {
      this.presentToast('两次输入的密码不一致');
    } else if (this.edit.password.length < 6 || this.edit.password.length > 32) {
      this.presentToast('密码长度必须在 6 到 32 位之间');
    } else {
      wilddog.auth().currentUser.updatePassword(this.edit.password).then(() => {
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
