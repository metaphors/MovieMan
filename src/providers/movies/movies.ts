import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

/*
  Generated class for the MoviesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MoviesProvider {

  hotMovies: any[];

  constructor(public http: HttpClient) {
    this.getHotMovies();
  }

  getHotMovies() {
    let hotMoviesUrl: string = "https://m.maoyan.com/movie/list.json?type=hot&offset=0&limit=100";
    this.http.get(hotMoviesUrl).subscribe(data => {
      this.hotMovies = data["data"]["movies"];
    });
  }

}
