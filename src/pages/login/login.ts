import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { SignupPage } from '../signup/signup';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  
  pages: Array<{ title: string, component: any }>;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  forgotPassword() {
    this.navCtrl.push(ForgotPasswordPage);
  }

  signUp() {
    this.navCtrl.push(SignupPage);
  }

}
