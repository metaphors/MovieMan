import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {EditPasswordPage} from './edit-password';

@NgModule({
  declarations: [
    EditPasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(EditPasswordPage),
  ],
})
export class EditPasswordPageModule {
}
