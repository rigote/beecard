import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteService } from '../../providers/remote-service';
import { StorageService } from '../../providers/storage-service';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public remoteServiceProvider: RemoteService,
    public storage: StorageService
  ) {
    let userData = this.storage.getUserData();
    
    if (userData.AccessToken != null) {
      this.remoteServiceProvider.validateToken(userData.AccessToken).then(success => {
        console.log('Sucesso');   
        this.navCtrl.setRoot(HomePage);   
      }, error => {
        this.navCtrl.push(LoginPage, { hideBackButton: true });
      });
    } else {
      this.navCtrl.push(LoginPage, { hideBackButton: true });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SplashPage');
  }

}
