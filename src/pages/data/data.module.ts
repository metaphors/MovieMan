import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ChartsModule} from "ng2-charts";
import {DataPage} from './data';

@NgModule({
  declarations: [
    DataPage,
  ],
  imports: [
    ChartsModule,
    IonicPageModule.forChild(DataPage),
  ],
})
export class DataPageModule {
}
