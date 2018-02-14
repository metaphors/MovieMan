import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';

import * as wilddog from "wilddog";

/**
 * Generated class for the ForgetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage {
  email: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
    this.email = '';
  }

  onSendPasswordResetEmail() {
    let pattern = /^([a-zA-Z0-9]+[-_\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[-_\.]?)*[a-zA-Z0-9]+(\.[a-zA-Z]{2,18})+$/;
    if (this.email === '') {
      this.presentToast('输入信息不能为空');
    } else if (!pattern.test(this.email)) {
      this.presentToast('邮箱地址格式不正确');
    } else {
      wilddog.auth().sendPasswordResetEmail(this.email).then(() => {
        this.presentConfirmToast('已发送密码重置邮件到您的注册邮箱，请立即点击密码重置链接修改密码！');
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

  presentConfirmToast(message: string) {
    let toast = this.toastCtrl.create({message: message, showCloseButton: true, closeButtonText: "确认"});
    toast.onDidDismiss(() => {
      this.navCtrl.pop().then(value => {
        return value;
      });
    });
    toast.present().then(value => {
      return value;
    });
  }
}
