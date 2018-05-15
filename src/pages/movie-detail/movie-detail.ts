import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the MovieDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movie-detail',
  templateUrl: 'movie-detail.html',
})
export class MovieDetailPage {

  movieDetail: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.movieDetail = this.navParams.get('movieDetail');
    console.log("movie detail", this.movieDetail);
  }

}
