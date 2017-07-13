import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public translateService: TranslateService) {

  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  translateToPortuguese(){
   this.translateService.use('pt_br');
  }

  translateToEnglish(){
    this.translateService.use('en_US');
  }

}
