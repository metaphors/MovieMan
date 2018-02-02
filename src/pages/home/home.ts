import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Refresher, Content, Slides, InfiniteScroll} from 'ionic-angular';

import {MoviesProvider} from "../../providers/movies/movies";
import {GeolocationProvider} from "../../providers/geolocation/geolocation";
import {InformationProvider} from "../../providers/information/information";
import {ParametersProvider} from "../../providers/parameters/parameters";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public moviesProvider: MoviesProvider, public geolocationProvider: GeolocationProvider, public informationProvider: InformationProvider, public parametersProvider: ParametersProvider) {
    this.moviesProvider.getMovies("init", "hot", 0, 12);
    this.moviesProvider.getHotMoviesTotal();
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
      this.moviesProvider.getHotMoviesTotal();
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

  timestampToDate(timestamp: number) {
    let date = new Date(timestamp);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
  }

  openMoviesPage(type: string) {
    this.parametersProvider.setParameterType(type, true);
    this.navCtrl.parent.select(1);
  }
}
