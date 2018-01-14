import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

/*
  Generated class for the InformationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InformationProvider {

  information: any[];

  constructor(public http: HttpClient) {

  }

  getInformation(method: string, offset: number) {
    let informationUrl: string = "http://m.maoyan.com/sns/group/1481351/contents.json?offset=" + offset;
    this.http.get(informationUrl).subscribe(data => {
      if (method === "init") {
        this.information = data["data"];
      } else if (method === "load") {
        this.information = this.information.concat(data["data"]);
      }
      console.log("information", this.information);
    });
  }

}
