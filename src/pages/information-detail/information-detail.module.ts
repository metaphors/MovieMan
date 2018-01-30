import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InformationDetailPage } from './information-detail';

@NgModule({
  declarations: [
    InformationDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(InformationDetailPage),
  ],
})
export class InformationDetailPageModule {}
