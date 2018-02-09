import  {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

/*
  Generated class for the MoviesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MoviesProvider {

  hotMovies: any[];
  comingMovies: any[];
  hasNext: any = {"hot": true, "coming": true};

  trailers: any[];

  expectedMovies: any[];

  hotMoviesTotal: number;
  expectedMoviesTotal: number;

  constructor(public http: HttpClient) {

  }

  getMovies(method: string, type: string, offset: number, limit: number) {
    let moviesUrl: string = "https://m.maoyan.com/movie/list.json?type=" + type + "&offset=" + offset + "&limit=" + limit;
    this.http.get(moviesUrl).subscribe(data => {
      if (method === "init") {
        if (type === "hot") {
          this.hotMovies = data["data"]["movies"];
          console.log("hot movies", this.hotMovies);
        } else if (type === "coming") {
          this.comingMovies = data["data"]["movies"];
          console.log("coming movies", this.comingMovies);
        }
      } else if (method === "load") {
        if (type === "hot") {
          this.hotMovies = this.hotMovies.concat(data["data"]["movies"]);
          console.log("hot movies", this.hotMovies);
        } else if (type === "coming") {
          this.comingMovies = this.comingMovies.concat(data["data"]["movies"]);
          console.log("coming movies", this.comingMovies);
        }
      }
      this.hasNext[type] = data["data"]["hasNext"];
      console.log("has next", this.hasNext[type]);
    });
  }

  getTrailers() {
    let trailersUrl: string = "http://api.maoyan.com/mmdb/movie/lp/list.json";
    this.http.get(trailersUrl).subscribe(data => {
      this.trailers = data["data"];
      console.log("trailers", this.trailers);
    });
  }

  getExpectedMovies() {
    let expectedMoviesUrl: string = "http://api.maoyan.com/mmdb/movie/v1/list/wish/order/coming.json?offset=0&limit=30";
    this.http.get(expectedMoviesUrl).subscribe(data => {
      this.expectedMovies = data["data"]["coming"];
      console.log("expected movies", this.expectedMovies);
    });
  }

  getHotMoviesTotal() {
    let hotMoviesTotalUrl: string = "http://m.maoyan.com/movie/list.json?type=hot&offset=0&limit=100";
    this.http.get(hotMoviesTotalUrl).subscribe(data => {
      this.hotMoviesTotal = data["data"]["movies"].length;
      console.log("hot movies total", this.hotMoviesTotal);
    });
  }

  getExpectedMoviesTotal() {
    let expectedMoviesTotalUrl: string = "http://api.maoyan.com/mmdb/movie/v1/list/wish/order/coming.json?offset=0&limit=0";
    this.http.get(expectedMoviesTotalUrl).subscribe(data => {
      this.expectedMoviesTotal = data["data"]["paging"]["total"];
      console.log("expected movies total", this.expectedMoviesTotal);
    });
  }

}
