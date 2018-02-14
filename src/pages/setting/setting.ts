import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';

import * as wilddog from "wilddog";

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  hasLoggedIn: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
    this.getLoginState();
  }

  getLoginState() {
    wilddog.auth().onAuthStateChanged(user => {
      user !== null ? this.hasLoggedIn = true : this.hasLoggedIn = false;
    });
  }

  onLogout() {
    wilddog.auth().signOut().then(() => {
      this.navCtrl.popToRoot().then(value => {
        return value;
      })
    }, error => {
      this.presentToast(error.name + ': ' + error.message);
    });
  }

  presentToast(message: string) {
    let toast = this.toastCtrl.create({message: message, duration: 1500, dismissOnPageChange: true});
    toast.present().then(value => {
      return value;
    });
  }
}
