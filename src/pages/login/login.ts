import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { RemoteService } from '../../providers/remote-service';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '../../providers/storage-service';
import { UserStorageModel } from '../../models/StorageModel';
import { STATUS_CODES } from 'http';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  
  public form: FormGroup;
  disabledButton: boolean = false;
  pages: Array<{ title: string, component: any }>;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController, 
              private fb: FormBuilder,
              public remoteServiceProvider: RemoteService,
              private translate: TranslateService,
              public storage: StorageService) {

    this.form = this.fb.group({
      Username: ['', Validators.compose([
        Validators.required
      ])],
      Password: ['', Validators.compose([
        Validators.required
      ])]
    });

    let userData = this.storage.getUserData();

    if (userData.AccessToken != null) {
      this.remoteServiceProvider.validateToken(userData.AccessToken).then(success => {
        this.navCtrl.setRoot(HomePage);
      }, error => {
        console.log('Token inválido');
      });
    }

  }

  login() {
    var formLogin = this.form.value;

    if (this.form.invalid || this.form.dirty) {
      
      this.disabledButton = false;
      
      if (this.form.controls['Username'].errors) {
        if (this.form.controls['Username'].errors.required)
          this.errorAlert("username_required", () => {});

        return false;
      }      

      if (this.form.controls['Password'].errors) {
        if (this.form.controls['Password'].errors.required)
          this.errorAlert("password_required", () => {});

        return false;
      }

    }

    this.remoteServiceProvider.generateToken(formLogin.Username, formLogin.Password).then(auth => {
      this.disabledButton = false;
      this.storage.setUserData(auth.Token, auth.ClientId);
      this.navCtrl.setRoot(HomePage);
    }, error => {
      
      this.disabledButton = false;

      let message: string;
      
      if (error.status == 400) {
        var responseBody = typeof error._body != "undefined" ? JSON.parse(error._body) : "";

        if (responseBody != "")
          message = responseBody.error_description;
        else
          message = "unexpected_error";
      }

      this.errorAlert(message, () => {});
    });
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
    console.log('ionViewDidLoad LoginPage');
  }

  forgotPassword() {
    this.navCtrl.push(ForgotPasswordPage);
  }

  signUp() {
    this.navCtrl.push(SignupPage);
  }

}
