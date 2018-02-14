import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {EditUsernamePage} from './edit-username';

@NgModule({
  declarations: [
    EditUsernamePage,
  ],
  imports: [
    IonicPageModule.forChild(EditUsernamePage),
  ],
})
export class EditUsernamePageModule {
}
