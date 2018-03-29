import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { CardModel } from '../../models/CardModel';
import { RemoteService } from '../../providers/remote-service';
import { StorageService } from '../../providers/storage-service';
import { LoginPage } from '../login/login';
import { TranslateService } from '@ngx-translate/core';
import { CreateCardPage} from '../create-card/create-card';
//import { debug } from 'util';

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
              private loadingCtrl: LoadingController,
              private translate: TranslateService,
              public remoteServiceProvider: RemoteService,
              public storage: StorageService) {
    let userData = this.storage.getUserData();
    this.cardId = navParams.get('cardId');
    this.userId = navParams.get('userId');
    
    if (userData.AccessToken != null) {
      this.remoteServiceProvider.validateToken(userData.AccessToken).then(success => {
        let loader = this.loadingCtrl.create({ content: this.translate.instant("global.message.load_profile")});
        loader.present();        
        this.token = userData.AccessToken;

        this.remoteServiceProvider.getPersonalCard(this.token, this.userId, this.cardId).then(card => {
            this.card = card;
            loader.dismiss();
          }, error => {
            console.log(error);
          }); 
      }, error => {
        this.navCtrl.setRoot(LoginPage);
      });
    } else {
      this.navCtrl.setRoot(LoginPage);
    }
  }

  ionViewDidLoad() {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  openPage(card: CardModel){
    console.log(card.Id + " " + card.UserId);
    ////this.navCtrl.setRoot(CreateCardPage);
    this.navCtrl.push(CreateCardPage, {obj: card});

  }

}
