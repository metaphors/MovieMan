import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';

import * as wilddog from "wilddog";

/**
 * Generated class for the EditUsernamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-username',
  templateUrl: 'edit-username.html',
})
export class EditUsernamePage {
  displayName: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
  }

  ionViewWillEnter() {
    this.getUserDisplayName();
  }

  getUserDisplayName() {
    wilddog.auth().onAuthStateChanged(user => {
      if (user !== null) {
        this.displayName = user.displayName;
      }
    });
  }

  onUpdateUserDisplayName() {
    if (this.displayName === '') {
      this.presentToast('输入信息不能为空');
    } else if (this.displayName.length > 20) {
      this.presentToast('昵称长度必须小于 20 位');
    } else {
      wilddog.auth().onAuthStateChanged(user => {
        user.updateProfile({'displayName': this.displayName}).then(() => {
          this.navCtrl.pop().then(value => {
            return value;
          });
        }, error => {
          this.presentToast(error.name + ': ' + error.message);
        });
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
