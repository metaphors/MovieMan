import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {IonicStorageModule} from "@ionic/storage";
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';

import {MoviesProvider} from '../providers/movies/movies';
import {GeolocationProvider} from '../providers/geolocation/geolocation';
import {InformationProvider} from '../providers/information/information';
import {ParametersProvider} from '../providers/parameters/parameters';
import {UserProvider} from '../providers/user/user';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      mode: "ios",
      preloadModules: true,
      tabsHideOnSubPages: 'true',
      backButtonText: ''
    }),
    IonicStorageModule.forRoot({
      name: 'myDatabase',
      driverOrder: ['sqlite', 'websql', 'indexeddb']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents:
    [
      MyApp
    ],
  providers:
    [
      StatusBar,
      SplashScreen,
      {provide: ErrorHandler, useClass: IonicErrorHandler},
      MoviesProvider,
      GeolocationProvider,
      InformationProvider,
      ParametersProvider,
      UserProvider
    ]
})

export class AppModule {
}
