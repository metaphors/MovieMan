import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ActionSheetController, ToastController} from 'ionic-angular';

import {ThemeProvider} from "../../providers/theme/theme";

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
  profilePage = 'ProfilePage';

  hasLoggedIn: boolean;
  user: { displayName: string, email: string, emailVerified: boolean, phone: string, phoneVerified: boolean, photoURL: string };

  theme: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public themeProvider: ThemeProvider) {
    this.user = {displayName: '', email: '', emailVerified: false, phone: '', phoneVerified: false, photoURL: ''};

    this.getActiveTheme();
  }

  ionViewWillEnter() {
    this.getLoginState();
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
      } else {
        this.hasLoggedIn = false;
      }
    });
  }

  getActiveTheme() {
    this.themeProvider.getActiveTheme().subscribe(theme => {
      this.theme = theme;
    });
  }

  toggleTheme() {
    if (!this.theme) {
      this.presentToast('退出应用后夜间模式也将退出');
    }
    this.themeProvider.setActiveTheme(!this.theme);
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

  presentLogoutActionSheet() {
    let logoutActionSheet = this.actionSheetCtrl.create({
      title: '确定要退出登录吗？',
      buttons: [{
        text: '确定', handler: () => {
          this.onLogout();
        }
      }, {text: '取消', role: 'cancel'}]
    });
    logoutActionSheet.present().then(value => {
      return value;
    })
  }

  openPage(page: string) {
    this.navCtrl.push(page).then(value => {
      return value;
    });
  }
}
