import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CardFormComponent } from './card-form';

@NgModule({
  declarations: [
    CardFormComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    CardFormComponent
  ]
})
export class CardFormComponentModule {}
