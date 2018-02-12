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

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocationProvider: GeolocationProvider) {
    this.getLoginStatus();
  }

  openPage(page: string) {
    this.navCtrl.push(page).then(value => {
      return value;
    });
  }

  getLoginStatus() {

  }
}
