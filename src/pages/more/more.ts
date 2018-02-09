import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

import {UserProvider} from "../../providers/user/user";
import {GeolocationProvider} from "../../providers/geolocation/geolocation";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider, public geolocationProvider: GeolocationProvider) {
    this.getLoginStatus();
  }

  openPage(page: string) {
    this.navCtrl.push(page).then(value => {
      return value;
    });
  }

  getLoginStatus() {
    this.userProvider.getLoginStatus().then(hasLoggedIn => {
      this.hasLoggedIn = hasLoggedIn;
      console.log("has logged in", this.hasLoggedIn);
    });
  }
}
