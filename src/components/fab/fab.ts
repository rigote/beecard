import { Component } from '@angular/core';
import { FabContainer, NavController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

import { CreateCardPage } from '../../pages/create-card/create-card';

@Component({
  selector: 'fab',
  templateUrl: 'fab.html'
})
export class FabComponent {

  options: BarcodeScannerOptions;
  results: {};

  constructor(private barCode: BarcodeScanner, private navCtrl: NavController) {
    console.log('Hello FabComponent Component');
  }

  async scanBarcode(){
    
    this.options = {
      prompt: 'Scan barcode'
    }

    this.results = await this.barCode.scan(this.options);
    console.log(this.results);
  }

  async encodeData(){
    const results = await this.barCode.encode(this.barCode.Encode.TEXT_TYPE, 'http://www.beecard.com.br')
  }

  FavCreateCardPage(fab: FabContainer) {
    fab.close();
    this.navCtrl.push(CreateCardPage);
  }

}
