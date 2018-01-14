import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Refresher, Content, Slides, InfiniteScroll} from 'ionic-angular';

import {MoviesProvider} from "../../providers/movies/movies";
import {GeolocationProvider} from "../../providers/geolocation/geolocation";
import {InformationProvider} from "../../providers/information/information";

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'high'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild(Content) content: Content;
  @ViewChild('hotMoviesSlides') hotMoviesSlides: Slides;
  @ViewChild('comingMoviesSlides') comingMoviesSlides: Slides;

  offset: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public moviesProvider: MoviesProvider, public geolocationProvider: GeolocationProvider, public informationProvider: InformationProvider) {
    this.moviesProvider.getMovies("init", "hot", 0, 12);
    this.moviesProvider.getExpectedMovies();
    this.moviesProvider.getExpectedMoviesTotal();

    this.geolocationProvider.getCurrentCity();

    this.informationProvider.getInformation("init", this.offset);
  }

  ngAfterViewInit() {
    this.hotMoviesSlides.freeMode = true;
    this.comingMoviesSlides.freeMode = true;
  }

  scrollToTop() {
    this.content.scrollToTop();
  }

  doRefresh(refresher: Refresher) {
    console.log("do refresh");
    setTimeout(() => {
      this.offset = 0;
      this.moviesProvider.getMovies("init", "hot", 0, 12);
      this.moviesProvider.getExpectedMovies();
      this.moviesProvider.getExpectedMoviesTotal();
      this.informationProvider.getInformation("init", this.offset);
      refresher.complete();
    }, 1500);
  }

  doInfinite(infiniteScroll: InfiniteScroll) {
    console.log("do infinite");
    setTimeout(() => {
      this.offset += 10;
      this.informationProvider.getInformation("load", this.offset);
      infiniteScroll.complete();
    }, 1000);
  }
}
