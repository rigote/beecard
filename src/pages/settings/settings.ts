import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { LoginPage } from '../login/login';
import { debug } from 'util';
import { StorageService } from '../../providers/storage-service';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  public language: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public translateService: TranslateService, public storage: StorageService) {    
    this.language = this.storage.getLanguage();
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  changeLanguage(){
    this.storage.setLanguage(this.language);
    this.translateService.use(this.language);
  }

  logoff(){
    this.storage.clearStorageData();
    this.navCtrl.setRoot(LoginPage);
  }

}
