import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides, Content, Refresher, InfiniteScroll} from 'ionic-angular';

import {MoviesProvider} from "../../providers/movies/movies";
import {GeolocationProvider} from "../../providers/geolocation/geolocation";

/**
 * Generated class for the MoviePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'high'
})
@Component({
  selector: 'page-movie',
  templateUrl: 'movie.html',
})
export class MoviePage {
  @ViewChild('outerSlides') outerSlides: Slides;
  @ViewChild('innerTrailersSlides') innerTrailersSlides: Slides;
  @ViewChild('innerExpectedMoviesSlides') innerExpectedMoviesSlides: Slides;
  @ViewChild('innerHotMoviesContent') innerHotMoviesContent: Content;
  @ViewChild('innerComingMoviesContent') innerComingMoviesContent: Content;

  type: string;

  offset: any = {"hot": 0, "coming": 0};
  limit: number = 12;

  constructor(public navCtrl: NavController, public navParams: NavParams, public moviesProvider: MoviesProvider, public geolocationProvider: GeolocationProvider) {
    this.type = "hot";

    this.moviesProvider.getMovies("init", "hot", this.offset["hot"], this.limit);
    this.moviesProvider.getMovies("init", "coming", this.offset["hot"], this.limit);
    this.moviesProvider.getTrailers();
    this.moviesProvider.getExpectedMovies();

    this.geolocationProvider.getCurrentCity();
  }

  scrollToTop() {
    let index = this.outerSlides.getActiveIndex();
    if (index === 0) {
      this.innerHotMoviesContent.scrollToTop();
    } else if (index === 1) {
      this.innerComingMoviesContent.scrollToTop();
    }
  }

  goToSlide(index: number) {
    this.outerSlides.slideTo(index);
  }

  slideToAnother() {
    let index = this.outerSlides.getActiveIndex();
    if (index === 0) {
      this.type = "hot";
      this.outerSlides.lockSwipeToPrev(true);
      this.outerSlides.lockSwipeToNext(false);
    } else if (index === 1) {
      this.type = "coming";
      this.outerSlides.lockSwipeToPrev(false);
      this.outerSlides.lockSwipeToNext(true);
    }
  }

  doRefresh(refresher: Refresher, type: string) {
    console.log("do refresh");
    setTimeout(() => {
      this.offset[type] = 0;
      this.moviesProvider.getMovies("init", type, this.offset[type], this.limit);

      if (type === "coming") {
        this.moviesProvider.getTrailers();
        this.moviesProvider.getExpectedMovies();
      }
      refresher.complete();
    }, 1500);
  }

  doInfinite(infiniteScroll: InfiniteScroll, type: string) {
    console.log("do infinite");
    setTimeout(() => {
      this.offset[type] += this.limit;
      this.moviesProvider.getMovies("load", type, this.offset[type], this.limit);
      infiniteScroll.complete();
    }, 1000);
  }

  ngAfterViewInit() {
    this.outerSlides.lockSwipeToPrev(true);

    this.innerTrailersSlides.freeMode = true;
    this.innerExpectedMoviesSlides.freeMode = true;
  }
}
