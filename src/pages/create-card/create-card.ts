import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { CardModel, CardType } from '../../models/CardModel';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { RemoteService } from '../../providers/remote-service';
import { LoginPage } from '../login/login';
import { userInfo } from 'os';
import { MainCardsPage } from '../main-cards/main-cards';

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
  token: string;
  clientId: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public remoteServiceProvider: RemoteService,
              public alertCtrl: AlertController,
              private fb: FormBuilder,
              private translate: TranslateService) {

    this.token = localStorage.getItem("access_token");
    this.clientId = localStorage.getItem("client_id");
    
    if (typeof this.token != 'undefined') {
      this.remoteServiceProvider.validateToken(this.token).then(success => {
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
      ])],
      PhoneNumber: ['', Validators.compose([])],
      Cellphone: ['', Validators.compose([])],
      Occupation: ['', Validators.compose([])],
      Website: ['', Validators.compose([])],
      Address: ['', Validators.compose([])],
      Address2: ['', Validators.compose([])],
      PostalCode: ['', Validators.compose([])],
      Neighborhood: ['', Validators.compose([])],
      City: ['', Validators.compose([])],
      Twitter: ['', Validators.compose([])],
      Facebook: ['', Validators.compose([])],
      Linkedin: ['', Validators.compose([])],
      Instagram: ['', Validators.compose([])],
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

    let cardModel = new CardModel();

    cardModel.updateModel(null, cardForm.Fullname, CardType.Personal, cardForm.Occupation, cardForm.PhoneNumber, 
      cardForm.Cellphone, cardForm.Email, cardForm.Website, cardForm.Facebook, cardForm.Twitter, cardForm.Linkedin, cardForm.Instagram, 
      null, null, cardForm.Address, cardForm.Address2, cardForm.PostalCode, cardForm.City, cardForm.Neighborhood);

      this.remoteServiceProvider.addPersonalCard(this.token, this.clientId, cardModel).then(success => {      
        this.disabledButton = false;
  
        this.successAlert("information_successfully_saved", () => {
          this.navCtrl.push(MainCardsPage, { hideBackButton: true });
        });
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
    console.log('ionViewDidLoad CreateCardPage');
  }

}
