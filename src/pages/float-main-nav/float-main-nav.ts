import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the FloatMainNav page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-float-main-nav',
  templateUrl: 'float-main-nav.html'
})
export class FloatMainNavPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FloatMainNavPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
