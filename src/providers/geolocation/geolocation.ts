import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

/*
  Generated class for the GeolocationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeolocationProvider {

  currentCity: string;

  constructor(public http: HttpClient) {

  }

  getCurrentCity() {
    let AMapWebServiceKey: string = "e24694ee3d12cdc0804aa0040a731cb2";
    let AMapIPLocatingUrl: string = "http://restapi.amap.com/v3/ip?key=" + AMapWebServiceKey;
    this.http.get(AMapIPLocatingUrl).subscribe(data => {
      let AMapGeocodeingUrl: string = "http://restapi.amap.com/v3/geocode/geo?key=" + AMapWebServiceKey + "&address=" + data["city"];
      this.http.get(AMapGeocodeingUrl).subscribe(data => {
        let longitude: string = data["geocodes"][0]["location"].split(",")[0];
        let latitude: string = data["geocodes"][0]["location"].split(",")[1];
        let meituanLocatingUrl: string = "http://api.mobile.meituan.com/group/v1/city/latlng/" + latitude + "," + longitude + "?tag=0";
        console.log(meituanLocatingUrl);
        this.http.get(meituanLocatingUrl).subscribe(data => {
          this.currentCity = data["data"]["city"];
          console.log("current city", this.currentCity);
        });
      });
    });
  }

}
