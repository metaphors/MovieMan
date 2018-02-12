import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import * as wilddog from 'wilddog';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = 'TabsPage';

  appId: string = "wd8837557731vfogoa";

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      let config = {authDomain: this.appId + ".wilddog.com"};
      wilddog.initializeApp(config);
    });
  }
}

