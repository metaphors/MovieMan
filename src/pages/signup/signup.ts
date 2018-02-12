import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';

import {UserProvider} from "../../providers/user/user";
import * as wilddog from "wilddog";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'off'
})
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  signup: { email: string, password: string, verification: string };

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public userProvider: UserProvider) {
    this.signup = {email: '', password: '', verification: ''};
  }

  onSignup() {
    let pattern = /^([a-zA-Z0-9]+[-_\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[-_\.]?)*[a-zA-Z0-9]+(\.[a-zA-Z]{2,18})+$/;
    if (this.signup.email === '' || this.signup.password === '' || this.signup.verification === '') {
      this.presentToast('输入信息不能为空');
    } else if (!pattern.test(this.signup.email)) {
      this.presentToast('邮箱地址不正确');
    } else if (this.signup.password !== this.signup.verification) {
      this.presentToast('两次输入的密码不一致');
    } else {
      wilddog.auth().createUserWithEmailAndPassword(this.signup.email, this.signup.password).then(() => {
        this.navCtrl.popToRoot().then(value => {
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
