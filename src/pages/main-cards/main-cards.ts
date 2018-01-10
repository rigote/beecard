import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, PopoverController } from 'ionic-angular';
import { CardModel } from '../../models/CardModel';
import { RemoteService } from '../../providers/remote-service';
import { StorageService } from '../../providers/storage-service';
import { LoginPage } from '../login/login';
import { CardProfilePage } from '../card-profile/card-profile';
import { ListActionsPage } from '../list-actions/list-actions';
import { FloatMainNavPage } from '../float-main-nav/float-main-nav';

/*
  Generated class for the MainCards page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-main-cards',
  templateUrl: 'main-cards.html'
})
export class MainCardsPage {

  public Cards: Array<CardModel>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public remoteServiceProvider: RemoteService,
              public storage: StorageService,
              public modalCtrl: ModalController,
              public popoverCtrl: PopoverController) {

    let userData = this.storage.getUserData();
    
    if (userData.AccessToken != null) {
      this.remoteServiceProvider.validateToken(userData.AccessToken).then(success => {
        console.log('Sucesso');        
      }, error => {
        this.navCtrl.setRoot(LoginPage);
      });
    } else {
      this.navCtrl.setRoot(LoginPage);
    }

    remoteServiceProvider.getPersonalCards(userData.AccessToken, userData.ClientId).then(cards => {
      console.log('Sucesso');
      this.Cards = cards;
    }, error => {
      console.log(error);
    });

  }

  presentModal() {
    //let modal = this.modalCtrl.create();
    let modal = this.modalCtrl.create(FloatMainNavPage);
    modal.present();
  }

  cardProfileModal(card: CardModel){
    let modal = this.modalCtrl.create(CardProfilePage, { userId: card.UserId, cardId: card.Id });
    modal.present();
  }

  listActionsPage(event) {
    let popover = this.popoverCtrl.create(ListActionsPage);
    popover.present({
      ev:event
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainCardsPage');
  }

}
