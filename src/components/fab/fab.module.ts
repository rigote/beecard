import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { FabComponent } from './fab';

@NgModule({
  declarations: [
    FabComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    FabComponent
  ]
})
export class FabComponentModule {}
