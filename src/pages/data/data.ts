import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the DataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'high'
})
@Component({
  selector: 'page-data',
  templateUrl: 'data.html',
})
export class DataPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
