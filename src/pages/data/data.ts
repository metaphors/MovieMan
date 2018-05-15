import {Component, ViewChild} from '@angular/core';
import {Content, IonicPage, NavController, NavParams} from 'ionic-angular';

import {GeolocationProvider} from "../../providers/geolocation/geolocation";
import {DataProvider} from "../../providers/data/data";

/**
 * Generated class for the DataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'high'
})
@Component({
  selector: 'page-data',
  templateUrl: 'data.html',
})
export class DataPage {
  @ViewChild(Content) content: Content;

  dataModel: string;
  piaofangDay: string;
  isSplit: boolean;
  paipianDay: string;
  shangzuoDay: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocationProvider: GeolocationProvider, public dataProvider: DataProvider) {
    this.geolocationProvider.getCurrentCity();

    this.dataModel = "piaofang";
    this.isSplit = true;
    this.getSomedayPiaoFang("today");
    this.getSomedayPaipian("today");
    this.getSomedayShangzuo('today');
  }

  getSomedayPiaoFang(day: string) {
    this.piaofangDay = day;
    this.getSomedayData(day);
  }

  getSomedayPaipian(day: string) {
    this.paipianDay = day;
    this.getSomedayData(day);
  }

  getSomedayShangzuo(day: string) {
    this.shangzuoDay = day;
    this.getSomedayData(day);
  }

  getSomedayData(day: string) {
    let date = new Date();

    if (day === "yesterday") {
      date = new Date(date.getTime() - 86400000);
    }

    if (day === "tomorrow") {
      date = new Date(date.getTime() + 86400000);
    }

    let someday: string = this.formatDate(date);
    this.dataProvider.getDayData(someday);
  }

  formatDate(date: Date) {
    let year: string = date.getFullYear().toString();
    let month: string = (date.getMonth() + 1).toString();
    let day: string = date.getDate().toString();
    if (parseInt(month) >= 1 && parseInt(month) <= 9) {
      month = '0' + month;
    }
    if (parseInt(day) >= 1 && parseInt(day) <= 9) {
      day = '0' + day;
    }
    let someDay: string = year + month + day;
    console.log('day', someDay);
    return someDay;
  }

  scrollToTop() {
    this.content.scrollToTop();
  }
}
