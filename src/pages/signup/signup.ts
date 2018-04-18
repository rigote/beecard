import { Component } from '@angular/core';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'  
})
export class SignupPage {

  editData: boolean = false;

  constructor() {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
