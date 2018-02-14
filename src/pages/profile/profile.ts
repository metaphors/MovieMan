import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ActionSheetController} from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController) {
    this.user = {displayName: '', email: '', emailVerified: false, phone: '', phoneVerified: false, photoURL: ''};
    this.getLoginState();
  }

  getLoginState() {
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

  presentChangeAvatarActionSheet() {
    let changeAvatarActionSheet = this.actionSheetCtrl.create({
      title: '更换头像', buttons: [{
        text: '相册', handler: () => {

        }
      }, {
        text: '拍照', handler: () => {

        }
      }, {text: '取消', role: 'cancel'}]
    });
    changeAvatarActionSheet.present().then(value => {
      return value;
    });
  }

  openPage(page: string) {
    this.navCtrl.push(page).then(value => {
      return value;
    });
  }
}
