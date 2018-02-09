import {Injectable} from '@angular/core';
import {Storage} from "@ionic/storage";

import * as wilddog from 'wilddog'

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  appId: string = "wd8837557731vfogoa";

  constructor(public storage: Storage) {
    let config = {authDomain: this.appId + ".wilddog.com"};
    wilddog.initializeApp(config);
  }

  getLoginStatus() {
    return this.storage.get('has_logged_in');
  }
}
