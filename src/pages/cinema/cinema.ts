import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Content, Refresher} from 'ionic-angular';

import {GeolocationProvider} from "../../providers/geolocation/geolocation";
import {CinemasProvider} from "../../providers/cinemas/cinemas";
import {ThemeProvider} from "../../providers/theme/theme";

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
  @ViewChild(Content) content: Content;

  cinemaArea: string;
  cinemaBrand: string;

  theme: boolean;

  selectOptions: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocationProvider: GeolocationProvider, public cinemasProvider: CinemasProvider, public themeProvider: ThemeProvider) {
    this.cinemaArea = "全部";
    this.cinemaBrand = "全部";

    this.geolocationProvider.getCurrentCity();
    this.cinemasProvider.getCinemas(this.geolocationProvider.currentCityId, this.cinemaArea, this.cinemaBrand);

    this.getActiveTheme();
  }

  ionViewWillEnter() {
    !this.theme ? this.selectOptions = {cssClass: 'popover-select'} : this.selectOptions = {cssClass: 'popover-select-dark'};
  }

  getActiveTheme() {
    this.themeProvider.getActiveTheme().subscribe(theme => {
      this.theme = theme;
    });
  }

  scrollToTop() {
    this.content.scrollToTop();
  }

  doRefresh(refresher: Refresher, type: string) {
    console.log("do refresh");
    setTimeout(() => {
      this.cinemasProvider.getCinemas(this.geolocationProvider.currentCityId, this.cinemaArea, this.cinemaBrand);
      refresher.complete();
    }, 1500);
  }
}
