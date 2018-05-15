import {Component, ViewChild} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  Slides,
  Content,
  Refresher,
  InfiniteScroll,
  ModalController
} from 'ionic-angular';

import {MoviesProvider} from "../../providers/movies/movies";
import {GeolocationProvider} from "../../providers/geolocation/geolocation";
import {ParametersProvider} from "../../providers/parameters/parameters";
import {ThemeProvider} from "../../providers/theme/theme";

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

  movieDetailPage = 'MovieDetailPage';
  trailerPage = 'TrailerPage';

  type: string;

  offset: any = {"hot": 0, "coming": 0};
  limit: number = 12;

  theme: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public moviesProvider: MoviesProvider, public geolocationProvider: GeolocationProvider, public parametersProvider: ParametersProvider, public themeProvider: ThemeProvider) {
    this.geolocationProvider.getCurrentCity();

    this.moviesProvider.getMovies("init", this.geolocationProvider.currentCityId, "hot", this.offset["hot"], this.limit);
    this.moviesProvider.getMovies("init", this.geolocationProvider.currentCityId, "coming", this.offset["hot"], this.limit);
    this.moviesProvider.getTrailers();
    this.moviesProvider.getExpectedMovies();

    this.getActiveTheme();
  }

  ngAfterViewInit() {
    this.outerSlides.lockSwipeToPrev(true);

    this.innerTrailersSlides.freeMode = true;
    this.innerExpectedMoviesSlides.freeMode = true;
  }

  ionViewWillEnter() {
    this.parametersProvider.parameterType['passFromHomePageToMoviePage'] === true ? this.type = this.parametersProvider.parameterType['type'] : this.type = "hot";
    this.parametersProvider.initParameterType();
    if (this.type === "hot") {
      this.goToSlide(0);
    } else if (this.type === "coming") {
      this.goToSlide(1);
    }
  }

  getActiveTheme() {
    this.themeProvider.getActiveTheme().subscribe(theme => {
      this.theme = theme;
    });
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
      this.moviesProvider.getMovies("init", this.geolocationProvider.currentCityId, type, this.offset[type], this.limit);

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
      this.moviesProvider.getMovies("load", this.geolocationProvider.currentCityId, type, this.offset[type], this.limit);
      infiniteScroll.complete();
    }, 1000);
  }

  openMovieDetailPage(movieId: number) {
    this.moviesProvider.getMovieDetail(movieId).then(data => {
      this.navCtrl.push(this.movieDetailPage, {'movieDetail': data}).then(value => {
        return value;
      })
    });
  }

  playTrailer(img: string, url: string, originName: string, movieName: string) {
    let trailerModal = this.modalCtrl.create(this.trailerPage, {
      img: img,
      url: url,
      originName: originName,
      movieName: movieName
    });
    trailerModal.present();
  }
}
