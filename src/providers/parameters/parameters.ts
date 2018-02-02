import {Injectable} from '@angular/core';

/*
  Generated class for the ParametersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ParametersProvider {

  parameterType: { 'type': string, 'passFromHomePageToMoviePage': boolean };

  constructor() {
    this.initParameterType();
  }

  initParameterType() {
    this.parameterType = {'type': 'hot', 'passFromHomePageToMoviePage': false};
  }

  setParameterType(type: string, passFromHomePageToMoviePage: boolean) {
    this.parameterType = {'type': type, 'passFromHomePageToMoviePage': passFromHomePageToMoviePage};
  }

}
