import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides} from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'off'
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
}
