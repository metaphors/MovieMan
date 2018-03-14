import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the InformationDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-information-detail',
  templateUrl: 'information-detail.html',
})
export class InformationDetailPage {
  main: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    let informationDetailUrl = "http://m.maoyan.com/information/" + this.navParams.get('contentId');
    console.log(informationDetailUrl);
    this.http.get(informationDetailUrl, {responseType: 'text'}).subscribe(data => {
      this.getMain(data);
      document.getElementById("information-detail-content").getElementsByClassName("scroll-content")[0].appendChild(this.main);
    });
  }

  getMain(str: string) {
    let div = document.createElement("div");
    div.innerHTML = str;
    let main = div.getElementsByClassName("main")[0];
    // console.log(main);
    let title = main.getElementsByClassName("title")[0];
    title.id = "information-detail-title";
    let content = main.getElementsByClassName("content")[0];
    content.id = "information-detail-content";
    content.removeChild(main.getElementsByTagName("style")[0]);
    let videoPlayers = content.getElementsByClassName("video-player");
    for (let i = 0; i < videoPlayers.length; i++) {
      videoPlayers[i].parentNode.removeChild(videoPlayers[i]);
    }
    this.main = main;
  }
}
