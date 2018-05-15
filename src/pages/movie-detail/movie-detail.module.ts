import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {MovieDetailPage} from './movie-detail';

@NgModule({
  declarations: [
    MovieDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MovieDetailPage),
  ],
})
export class MovieDetailPageModule {
}
