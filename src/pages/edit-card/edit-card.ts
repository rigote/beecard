import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-edit-card',
  templateUrl: 'edit-card.html',
})
export class EditCardPage {

  cardId: string;
  editData: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.cardId = this.navParams.get('cardId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditCardPage');
  }

}
