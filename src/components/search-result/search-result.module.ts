import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { SearchResultComponent } from './search-result';

@NgModule({
  declarations: [
    SearchResultComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    SearchResultComponent
  ]
})
export class SearchResultComponentModule {}
