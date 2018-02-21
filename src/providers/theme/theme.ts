import {Injectable} from '@angular/core';

import {Storage} from "@ionic/storage";

import {BehaviorSubject} from "rxjs/BehaviorSubject";

/*
  Generated class for the ThemeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ThemeProvider {
  theme: BehaviorSubject<boolean>;

  constructor(public storage: Storage) {
    this.theme = new BehaviorSubject<boolean>(false);
  }

  getActiveTheme() {
    return this.theme.asObservable();
  }

  setActiveTheme(theme: boolean) {
    this.theme.next(theme);
  }
}
