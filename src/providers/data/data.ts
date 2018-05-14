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

  constructor(public http: HttpClient) {
  }

  getDayPiaofang(date: string) {
    let dayPiaofangUrl: string = "http://box.maoyan.com/promovie/api/box/national.json?beginDate=" + date;
    this.http.get(dayPiaofangUrl).subscribe(data => {
      this.queryDate = data["data"]["queryDate"];
      console.log("query date", this.queryDate);
      this.totalBox = data["data"]["totalBox"];
      this.totalBoxUnit = data["data"]["totalBoxUnit"];
      console.log("total box", this.totalBox + this.totalBoxUnit);
      this.updateInfo = data["data"]["updateInfo"];
      console.log("update info", this.updateInfo);
      this.list = data["data"]["list"];
      console.log("list", this.list);
    });
  }

}
