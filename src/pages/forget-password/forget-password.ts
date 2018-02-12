import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

import * as wilddog from "wilddog";

/**
 * Generated class for the ForgetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'off'
})
@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage {
  email: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.email = '';
  }
}
