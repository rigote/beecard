import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { CardModel } from '../../models/CardModel';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { RemoteService } from '../../providers/remote-service';
import { LoginPage } from '../login/login';

/*
  Generated class for the CreateCard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-create-card',
  templateUrl: 'create-card.html'
})
export class CreateCardPage {

  public form: FormGroup;
  card: CardModel;
  disabledButton: boolean = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public remoteServiceProvider: RemoteService,
              public alertCtrl: AlertController,
              private fb: FormBuilder,
              private translate: TranslateService) {

    var token = localStorage.getItem("access_token");
    
    if (typeof token != 'undefined') {
      this.remoteServiceProvider.validateToken(token).then(success => {
        console.log('Sucesso');        
      }, error => {
        this.navCtrl.push(LoginPage);
      });
    }

    this.form = this.fb.group({
      Fullname: ['', Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(200),
        Validators.required
      ])],
      Email: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(100),
        Validators.required
      ])]
    });

  }

  createCard(){

    this.disabledButton = true;
    
    var cardForm = this.form.value;   

    if (this.form.invalid || this.form.dirty) {
      
      this.disabledButton = false;
      
      if (this.form.controls['Fullname'].errors) {
        if (this.form.controls['Fullname'].errors.required)
          this.errorAlert("fullname_required", () => {});

        if (this.form.controls['Fullname'].errors.minlength || this.form.controls['Fullname'].errors.maxlength)
          this.errorAlert("fullname_length", () => {});

        return false;
      }      

      if (this.form.controls['Email'].errors) {
        if (this.form.controls['Email'].errors.required)
          this.errorAlert("email_required", () => {});

        if (this.form.controls['Email'].errors.minlength || this.form.controls['Email'].errors.maxlength)
          this.errorAlert("email_length", () => {});

        return false;
      }
    }

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
    console.log('ionViewDidLoad CreateCardPage');
  }

}
