import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RemoteService } from '../../providers/remote-service';
import { UserModel } from '../../models/UserModel';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { debug } from 'util';

/*
  Generated class for the Signup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  providers: [RemoteService]
})
export class SignupPage {

  public form: FormGroup;
  user: UserModel;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public remoteServiceProvider: RemoteService,
              private fb: FormBuilder) {

    this.form = this.fb.group({
      Firstname: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(160),
        Validators.required
      ])],
      Lastname: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(160),
        Validators.required
      ])],
      Email: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(160),
        Validators.required
      ])],
      Password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])],
      PhoneNumber: ['', Validators.compose([
        Validators.minLength(10),
        Validators.required
      ])],
    });

  }

  saveUser(){
    this.user = new UserModel();
    this.user.updateModel(this.form.controls["Firstname"].value, 
                          this.form.controls["Lastname"].value, 
                          this.form.controls["Email"].value, 
                          this.form.controls["Password"].value,
                          this.form.controls["PhoneNumber"].value, 
                          new Date(), 
                          null, 
                          null, 
                          true);

    this.remoteServiceProvider.addUser(this.user);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
