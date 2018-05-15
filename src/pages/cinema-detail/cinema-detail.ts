import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the CinemaDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cinema-detail',
  templateUrl: 'cinema-detail.html',
})
export class CinemaDetailPage {

  cinemaDetail: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.cinemaDetail = this.navParams.get('cinemaDetail');
    console.log("cinema detail", this.cinemaDetail);
  }

}
