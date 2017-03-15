import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CardModel, CardSocialMedia, CardType, SocialMediaType } from '../../models/CardModel';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public Cards: Array<CardModel>;

  constructor(public navCtrl: NavController) {
    this.Cards = this.CreateMock();
  }

  private CreateMock(): Array<CardModel>{

    var cards = new Array<CardModel>();

    for (let i: number = 0; i < 10; i++){
      let card: CardModel = {
        AvatarImage: "assets/images/avatar.jpg",
        Cellphone: "+55 11 98000-8000",
        CompanyLogo: "assets/images/logo-dell.png",
        Email: "stark@stark.com",
        FullName: "Tony Stark",
        Occupation: "CEO",
        Phone: "+55 11 3874-4600",
        SocialMedias: [{ Type: SocialMediaType.Linkedin, Url: "http://linkedin.com" }],
        Type: CardType.Company,
        Website:  "assets/images/logo-dell.png",
        IsFavorite: true,
        CompanyName: "Dell",
        IdentityBgColor: "#009dff",
        IdentityFontColor: "#fff"
      };

      cards.push(card);
    }

    return cards;    

  }

}
