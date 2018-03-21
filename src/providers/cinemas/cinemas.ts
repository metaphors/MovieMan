import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

/*
  Generated class for the CinemaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CinemasProvider {
  areas: string[];
  brands: string[];
  cinemas: any[];

  constructor(public http: HttpClient) {
  }

  getCinemas(cityId: number, cinemaArea: string, cinemaBrand: string) {
    let cinemasUrl: string = "http://m.maoyan.com/cinemas.json?ci=" + cityId;
    this.http.get(cinemasUrl).subscribe(data => {
      this.areas = ["全部"];
      this.brands = ["全部"];
      this.cinemas = [];

      let allCinemas: any[] = [];

      for (let area in data["data"]) {
        this.areas.push(area);

        for (let cinema of data["data"][area]) {
          allCinemas.push(cinema);
        }
      }

      let tempBrands = new Set();
      allCinemas.map(value => {
        tempBrands.add(value["brd"]);
      });
      if (tempBrands.has("其它")) {
        tempBrands.delete("其它");
        tempBrands.add("其它");
      }
      tempBrands.forEach(value => {
        this.brands.push(value);
      });

      if (cinemaArea === "全部" && cinemaBrand === "全部") {
        allCinemas.map(cinema => {
          this.cinemas.push(cinema);
        });
      } else if (cinemaArea !== "全部" && cinemaBrand === "全部") {
        allCinemas.map(cinema => {
          if (cinema["area"] === cinemaArea) {
            this.cinemas.push(cinema);
          }
        });
      } else if (cinemaArea === "全部" && cinemaBrand !== "全部") {
        allCinemas.map(cinema => {
          if (cinema["brd"] === cinemaBrand) {
            this.cinemas.push(cinema);
          }
        });
      } else if (cinemaArea !== "全部" && cinemaBrand !== "全部") {
        allCinemas.map(cinema => {
          if (cinema["area"] === cinemaArea && cinema["brd"] === cinemaBrand) {
            this.cinemas.push(cinema);
          }
        });
      }

      console.log("areas", this.areas);
      console.log("brands", this.brands);
      console.log("cinemas", this.cinemas);
    });
  }
}
