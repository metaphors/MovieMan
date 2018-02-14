import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {EditPhonePage} from './edit-phone';

@NgModule({
  declarations: [
    EditPhonePage,
  ],
  imports: [
    IonicPageModule.forChild(EditPhonePage),
  ],
})
export class EditPhonePageModule {
}
