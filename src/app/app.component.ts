import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {WilddogProvider} from "../providers/wilddog/wilddog";
import {ThemeProvider} from "../providers/theme/theme";

import * as wilddog from 'wilddog';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = 'TabsPage';

  theme: string;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public wilddogProvider: WilddogProvider, public themeProvider: ThemeProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      let config = {authDomain: this.wilddogProvider.appId + ".wilddog.com"};
      wilddog.initializeApp(config);

      this.themeProvider.getActiveTheme().subscribe(theme => {
        theme ? this.theme = 'dark-theme' : this.theme = 'light-theme';
      });
    });
  }
}
