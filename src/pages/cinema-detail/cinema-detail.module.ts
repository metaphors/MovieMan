import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {CinemaDetailPage} from './cinema-detail';

@NgModule({
  declarations: [
    CinemaDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CinemaDetailPage),
  ],
})
export class CinemaDetailPageModule {
}
