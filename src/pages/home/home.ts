import { Component } from '@angular/core';
import { NavController, ModalController, ViewController, NavParams } from 'ionic-angular';
import { CardModel, CardType, SocialMediaType } from '../../models/CardModel';

import { FloatMainNavPage } from '../float-main-nav/float-main-nav';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public Cards: Array<CardModel>;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
    this.Cards = this.CreateMock();
  }

  private CreateMock(): Array<CardModel>{

    var cards = new Array<CardModel>();

    for (let i: number = 0; i < 10; i++){
      let card: CardModel;

      if (i < 5) {
        card = {
          AvatarImage: "assets/images/avatar.jpg",
          Cellphone: "+55 11 98000-8000",
          CompanyLogo: "assets/images/logo-dell.png",
          Email: "stark@stark.com",
          FullName: "Tony Stark",
          Occupation: "CEO",
          Phone: "+55 11 3874-4600",
          SocialMedias: [{ Type: SocialMediaType.Linkedin, Url: "http://linkedin.com" }],
          Type: CardType.Company,
          Website:  "www.dell.com.br",
          IsFavorite: true,
          CompanyName: "Dell",
          Config: {
            BgColor: "#009dff",
            FontColor: "#fff"
          }          
        };
      }
      else {
        card = {
          AvatarImage: "assets/images/avatar.jpg",
          Cellphone: "+55 11 98000-8999",
          CompanyLogo: null,
          Email: "teste@teste.com",
          FullName: "João do Teste",
          Occupation: null,
          Phone: "+55 11 3874-4000",
          SocialMedias: [{ Type: SocialMediaType.Facebook, Url: "http://facebook.com" }, { Type: SocialMediaType.Twitter, Url: "http://twitter.com" }],
          Type: CardType.Personal,
          Website:  "",
          IsFavorite: false,
          CompanyName: null,
          Config: null
        };
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

}
