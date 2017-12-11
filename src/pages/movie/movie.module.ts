import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {MoviePage} from './movie';

@NgModule({
  declarations: [
    MoviePage,
  ],
  imports: [
    IonicPageModule.forChild(MoviePage),
  ],
})
export class MoviePageModule {
}
