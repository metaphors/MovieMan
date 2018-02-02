import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';

/**
 * Generated class for the TabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'high'
})
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  homeRoot = 'HomePage';
  movieRoot = 'MoviePage';
  cinemaRoot = 'CinemaPage';
  dataRoot = 'DataPage';
  moreRoot = 'MorePage';

  constructor(public navCtrl: NavController) {
  }

}
