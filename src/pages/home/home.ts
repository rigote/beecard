import { Component } from '@angular/core';
import { NavController, ModalController, ViewController, NavParams } from 'ionic-angular';
import { CardModel, CardType, SocialMediaType } from '../../models/CardModel';
import { RemoteService } from '../../providers/remote-service';
import { FloatMainNavPage } from '../float-main-nav/float-main-nav';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public Cards: Array<CardModel>;

  constructor(public navCtrl: NavController, 
              public modalCtrl: ModalController,
              private view: ViewController,
              private navParams: NavParams,
              public remoteServiceProvider: RemoteService) {

    var token = localStorage.getItem("access_token");
    
    if (typeof token != 'undefined') {
      this.remoteServiceProvider.validateToken(token).then(success => {
        console.log('Sucesso');        
      }, error => {
        this.navCtrl.push(LoginPage);
      });
    }

    this.Cards = this.CreateMock();
  }

  private CreateMock(): Array<CardModel>{

    var cards = new Array<CardModel>();

    for (let i: number = 0; i < 10; i++){
      let card: CardModel = new CardModel();

      if (i < 5) {        
        card.AvatarImage = "assets/images/avatar.jpg";
        card.Cellphone = "+55 11 98000-8000";
        card.CompanyLogo = "assets/images/logo-dell.png";
        card.Email = "stark@stark.com";
        card.FullName = "Tony Stark";
        card.Occupation = "CEO";
        card.Phone = "+55 11 3874-4600";
        card.SocialMedias = [{ Type: SocialMediaType.Linkedin, Url: "http://linkedin.com" }];
        card.Type = CardType.Company;
        card.Website = "www.dell.com.br";
        card.IsFavorite = true;
        card.CompanyName = "Dell";
        card.Config = {
          BgColor: "#009dff",
          FontColor: "#fff"
        };
        card.Address = "";
        card.Address2 = "";
        card.PostalCode = "";
        card.Neighborhood = "";
        card.City = "";        
      }
      else {
        card.AvatarImage = "assets/images/avatar.jpg";
        card.Cellphone = "+55 11 98000-8999";
        card.CompanyLogo = null;
        card.Email = "teste@teste.com";
        card.FullName = "João do Teste";
        card.Occupation = null;
        card.Phone = "+55 11 3874-4000";
        card.SocialMedias = [{ Type: SocialMediaType.Facebook, Url: "http://facebook.com" }, { Type: SocialMediaType.Twitter, Url: "http://twitter.com" }];
        card.Type = CardType.Personal;
        card.Website =  "";
        card.IsFavorite = false;
        card.CompanyName = null;
        card.Config = null;
        card.Address = "";
        card.Address2 = "";
        card.PostalCode = "";
        card.Neighborhood = "";
        card.City = "";
      }
      cards.push(card);
    }

    return cards;    

  }

  ionViewDidLoad() {
    // Put here the code you want to execute
  }

  presentModal() {
    //let modal = this.modalCtrl.create();
    let modal = this.modalCtrl.create(FloatMainNavPage);
    modal.present();
  }

  ionViewWillEnter() {
    if (typeof this.navParams.get('hideBackButton') != 'undefined')
      this.view.showBackButton(false);
  }

}
