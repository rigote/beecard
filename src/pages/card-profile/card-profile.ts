import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { CardModel } from '../../models/CardModel';
import { RemoteService } from '../../providers/remote-service';
import { StorageService } from '../../providers/storage-service';
import { LoginPage } from '../login/login';

/*
  Generated class for the MainCards page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-card-profile',
  templateUrl: 'card-profile.html'
})
export class CardProfilePage {

  public card: CardModel;
  private cardId: string;
  private userId: string;
  private token: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public viewCtrl: ViewController,
              public remoteServiceProvider: RemoteService,
              public storage: StorageService) {

    let userData = this.storage.getUserData();
    
    if (userData.AccessToken != null) {
      this.remoteServiceProvider.validateToken(userData.AccessToken).then(success => {
        console.log('Sucesso');        
        this.token = userData.AccessToken;
      }, error => {
        this.navCtrl.setRoot(LoginPage);
      });
    } else {
      this.navCtrl.setRoot(LoginPage);
    }

    this.cardId = navParams.get('cardId');
    this.userId = navParams.get('userId')       
  }

  ionViewDidLoad() {
    this.remoteServiceProvider.getPersonalCard(this.token, this.userId, this.cardId).then(card => {
      console.log('Sucesso');
      debugger;
      this.card = card;
    }, error => {
      console.log(error);
    }); 
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
