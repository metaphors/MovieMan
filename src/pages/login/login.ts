import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides, ToastController} from 'ionic-angular';

import * as wilddog from "wilddog";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'high'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @ViewChild('slides') slides: Slides;

  signupPage = 'SignupPage';
  forgetPasswordPage = 'ForgetPasswordPage';

  loginMode: string;
  isClearTextPassword: boolean;

  emailLogin: { email: string, password: string };
  phoneLogin: { phone: string, verification: string };

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
    this.loginMode = "email";
    this.isClearTextPassword = false;

    this.emailLogin = {email: '', password: ''};
    this.phoneLogin = {phone: '', verification: ''};
  }

  ngAfterViewInit() {
    this.slides.lockSwipeToPrev(true);
  }

  openPage(page: string) {
    this.navCtrl.push(page).then(value => {
      return value;
    });
  }

  goToSlide(index: number) {
    this.slides.slideTo(index);
  }

  slideToAnother() {
    let index = this.slides.getActiveIndex();
    if (index === 0) {
      this.loginMode = "email";
      this.slides.lockSwipeToPrev(true);
      this.slides.lockSwipeToNext(false);
    } else if (index === 1) {
      this.loginMode = "phone";
      this.slides.lockSwipeToPrev(false);
      this.slides.lockSwipeToNext(true);
    }
  }

  toggleClearTextPassword() {
    this.isClearTextPassword ? this.isClearTextPassword = false : this.isClearTextPassword = true;
  }

  onEmailLogin() {
    if (this.emailLogin.email === '' || this.emailLogin.password === '') {
      this.presentToast('输入信息不能为空');
    } else {
      wilddog.auth().signInWithEmailAndPassword(this.emailLogin.email, this.emailLogin.password).then(() => {
        this.navCtrl.popToRoot().then(value => {
          return value;
        });
      }, error => {
        this.presentToast(error.name + ': ' + error.message);
      });
    }
  }

  onPhoneLogin() {

  }

  presentToast(message: string) {
    let toast = this.toastCtrl.create({message: message, duration: 1500, dismissOnPageChange: true});
    toast.present().then(value => {
      return value;
    });
  }
}
