import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

import {GeolocationProvider} from "../../providers/geolocation/geolocation";

import * as wilddog from "wilddog";

/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'high'
})
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage {
  settingPage = 'SettingPage';
  loginPage = 'LoginPage';
  profilePage = 'ProfilePage';

  hasLoggedIn: boolean;
  user: { displayName: string, email: string, emailVerified: boolean, phone: string, phoneVerified: boolean, photoURL: string };

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocationProvider: GeolocationProvider) {
    this.user = {displayName: '', email: '', emailVerified: false, phone: '', phoneVerified: false, photoURL: ''};
    this.getLoginState();
  }

  openPage(page: string) {
    this.navCtrl.push(page).then(value => {
      return value;
    });
  }

  getLoginState() {
    wilddog.auth().onAuthStateChanged(user => {
      if (user !== null) {
        this.hasLoggedIn = true;
        this.user = {
          displayName: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
          phone: user.phone,
          phoneVerified: user.phoneVerified,
          photoURL: user.photoURL
        };
        console.log("user", this.user);
      } else {
        this.hasLoggedIn = false;
      }
    });
  }
}
