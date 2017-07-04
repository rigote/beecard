import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-scan-qr-code',
  templateUrl: 'scan-qr-code.html'
})
export class ScanQrCodePage {
  
  options: BarcodeScannerOptions;
  results: {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private barCode: BarcodeScanner) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanQrCodePage');
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

}
