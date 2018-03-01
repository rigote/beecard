import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, PopoverController, LoadingController } from 'ionic-angular';
import { CardModel } from '../../models/CardModel';
import { RemoteService } from '../../providers/remote-service';
import { StorageService } from '../../providers/storage-service';
import { LoginPage } from '../login/login';
import { CardProfilePage } from '../card-profile/card-profile';
import { FloatMainNavPage } from '../float-main-nav/float-main-nav';
import { formatUrlPart } from 'ionic-angular/navigation/url-serializer';
import { CallNumber } from '@ionic-native/call-number';
import { EmailComposer } from '@ionic-native/email-composer';



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
              public popoverCtrl: PopoverController,
              private loadingCtrl: LoadingController, 
              private callNumber: CallNumber,
              private emailComposer: EmailComposer) {

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
      let loader = this.loadingCtrl.create({ content: "Carregando cartões..." });
      loader.present();
      this.Cards = cards;
      loader.dismiss();
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

  composeEmail(email: string): void{
    console.log('Email function ' + email.toString());
    
        //Now we know we can send
        let emailparam = {
          to: 'Alias <' + email.toString() + '>',
          
          subject: '[Beecard]',
          body: 'Venha conhecer o Beecard.',
          isHtml: true,
        };
        
        // Send a text message using default options
        this.emailComposer.open(emailparam);
  
     
  }

  makeCall(card: CardModel){

    let number: string = null;

    if (card.Cellphone)
      number = this.formatPhoneNumber(card.Cellphone).toString();
    else if (card.Phone)
      number = this.formatPhoneNumber(card.Phone).toString();

    this.callNumber.callNumber(number, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }

  getWhatsappUrl(cellphone: string): string{
    return 'https://api.whatsapp.com/send?phone=' + this.formatPhoneNumber(cellphone).toString();
  }

  
  formatPhoneNumber(number: string): number{
    return parseInt(number.replace(/\D/g, ''), 10);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainCardsPage');
  }

}
