import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CardComponent } from './card';

@NgModule({
  declarations: [
    CardComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    CardComponent
  ]
})
export class CardComponentModule {}
