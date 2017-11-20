import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { RemoteService } from '../../providers/remote-service';
import { UserModel } from '../../models/UserModel';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
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
  disabledButton: boolean = false;

  constructor(public navCtrl: NavController, 
              public alertCtrl: AlertController,
              public navParams: NavParams, 
              public remoteServiceProvider: RemoteService,
              private fb: FormBuilder,
              private translate: TranslateService) {

    this.form = this.fb.group({
      Firstname: ['', Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(160),
        Validators.required
      ])],
      Lastname: ['', Validators.compose([
        Validators.minLength(2),
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
      Birthdate: ['', Validators.compose([
        Validators.required
      ])],
    });

  }

  saveUser(){
    
    this.disabledButton = true;

    if (this.form.invalid && this.form.dirty) {
      let alert = this.alertCtrl.create({
        title: this.translate.instant("global.alert.error"),
        subTitle: this.translate.instant("global.message.invalid_data"),
        buttons: ['OK']
      });
      alert.present();

      this.disabledButton = false;

      return false;
    }

    var userForm = this.form.value;

    this.user = new UserModel();
    this.user.updateModel(userForm.Firstname, 
                          userForm.Lastname, 
                          userForm.Email, 
                          userForm.Password,
                          userForm.PhoneNumber, 
                          new Date(userForm.PhoneNumber), 
                          null, 
                          null, 
                          true);

    this.remoteServiceProvider.addUser(this.user).then(success => {      
      this.disabledButton = false;

      this.successAlert("information_successfully_saved", () => {});
    }, error => {

      this.disabledButton = false;

      let message: string;

      if (error.status == 404)
        message = "information_not_found";
      else {
        var responseBody = typeof error._body != "undefined" ? JSON.parse(error._body) : "";

        if (responseBody != "")
          message = responseBody.summary;
        else
          message = "unexpected_error";
      }
        
      this.errorAlert(message, () => {});

    });;
    
  }

  successAlert(message: string, callback: Function) {
    let alert = this.alertCtrl.create({
      title: this.translate.instant("global.alert.success"),
      subTitle: this.translate.instant("global.message." + message),
      buttons: [{
        text: 'OK',
        handler: () => { 
          callback.call(this); 
        }
      }]
    });
    alert.present();
  }

  errorAlert(message: string, callback: Function) {
    let alert = this.alertCtrl.create({
      title: this.translate.instant("global.alert.error"),
      subTitle: this.translate.instant("global.message." + message),
      buttons: [{
        text: 'OK',
        handler: () => { 
          callback.call(this); 
        }
      }]
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
