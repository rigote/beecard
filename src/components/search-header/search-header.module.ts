import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { SearchHeaderComponent } from './search-header';

@NgModule({
  declarations: [
    SearchHeaderComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    SearchHeaderComponent
  ]
})
export class SearchHeaderComponentModule {}
