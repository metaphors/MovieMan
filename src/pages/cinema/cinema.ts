import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the CinemaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'high'
})
@Component({
  selector: 'page-cinema',
  templateUrl: 'cinema.html',
})
export class CinemaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
