import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';
import {TrailerPage} from './trailer';

@NgModule({
  declarations: [
    TrailerPage,
  ],
  imports: [
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    IonicPageModule.forChild(TrailerPage),
  ],
})
export class TrailerPageModule {
}
