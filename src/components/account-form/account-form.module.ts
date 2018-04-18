import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AccountFormComponent } from './account-form';

@NgModule({
  declarations: [
    AccountFormComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    AccountFormComponent
  ]
})
export class AccountFormComponentModule {}
