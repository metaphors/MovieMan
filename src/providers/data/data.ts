import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  queryDate: string;
  totalBox: string;
  totalBoxUnit: string;
  updateInfo: string;
  list: any[];

  boxRateMovieNameArray: string[] = [];
  boxRateArray: number[] = [];
  splitBoxRateMovieNameArray: string[] = [];
  splitBoxRateArray: number[] = [];
  showRateMovieNameArray: string[] = [];
  showRateArray: number[] = [];

  constructor(public http: HttpClient) {
  }

  getDayData(date: string) {
    let dayPiaofangUrl: string = "http://box.maoyan.com/promovie/api/box/national.json?beginDate=" + date;
    this.http.get(dayPiaofangUrl).subscribe(data => {
      this.queryDate = data["data"]["queryDate"];
      // console.log("query date", this.queryDate);
      this.totalBox = data["data"]["totalBox"];
      this.totalBoxUnit = data["data"]["totalBoxUnit"];
      // console.log("total box", this.totalBox + this.totalBoxUnit);
      this.updateInfo = data["data"]["updateInfo"];
      // console.log("update info", this.updateInfo);
      this.list = data["data"]["list"];
      // console.log("list", this.list);

      this.boxRateMovieNameArray.splice(0, this.boxRateMovieNameArray.length);
      this.boxRateArray = [];
      this.splitBoxRateMovieNameArray.splice(0, this.splitBoxRateMovieNameArray.length);
      this.splitBoxRateArray = [];
      this.showRateMovieNameArray.splice(0, this.showRateMovieNameArray.length);
      this.showRateArray = [];

      let restBoxRate: number = 100;
      let restSplitBoxRate: number = 100;
      let restShowRate: number = 100;

      for (let item of data["data"]["list"]) {
        if (parseFloat(item["boxRate"]) >= 1) {
          this.boxRateMovieNameArray.push(item["movieName"]);
          this.boxRateArray.push(parseFloat(item["boxRate"]));
          restBoxRate -= parseFloat(item["boxRate"]);
        }

        if (parseFloat(item["splitBoxRate"]) >= 1) {
          this.splitBoxRateMovieNameArray.push(item["movieName"]);
          this.splitBoxRateArray.push(parseFloat(item["splitBoxRate"]));
          restSplitBoxRate -= parseFloat(item["splitBoxRate"]);
        }

        if (parseFloat(item["showRate"]) >= 1) {
          this.showRateMovieNameArray.push(item["movieName"]);
          this.showRateArray.push(parseFloat(item["showRate"]));
          restShowRate -= parseFloat(item["showRate"]);
        }
      }

      if (restBoxRate > 0) {
        this.boxRateMovieNameArray.push("其它");
        this.boxRateArray.push(restBoxRate);
      }
      if (restSplitBoxRate > 0) {
        this.splitBoxRateMovieNameArray.push("其它");
        this.splitBoxRateArray.push(restSplitBoxRate);
      }
      if (restShowRate > 0) {
        this.showRateMovieNameArray.push("其它");
        this.showRateArray.push(restShowRate);
      }

      console.log("box rate movie name array", this.boxRateMovieNameArray);
      console.log("box rate array", this.boxRateArray);
      console.log("split box rate movie name array", this.splitBoxRateMovieNameArray);
      console.log("split box rate array", this.splitBoxRateArray);
      console.log("show rate movie name array", this.showRateMovieNameArray);
      console.log("show rate array", this.showRateArray);
    });
  }

}
