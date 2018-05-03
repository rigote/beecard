import { Component, Input } from '@angular/core';
import { NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { CardModel, CardType } from '../../models/CardModel';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { RemoteService } from '../../providers/remote-service';
import { StorageService } from '../../providers/storage-service';
import { LoginPage } from '../../pages/login/login';
import { MainCardsPage } from '../../pages/main-cards/main-cards';
import { UserStorageModel } from '../../models/StorageModel';
import { PhotoServiceProvider } from '../../providers/photo-service';

@Component({
  selector: 'card-form',
  templateUrl: 'card-form.html'
})
export class CardFormComponent {

  form: FormGroup;
  card: CardModel;  
  disabledButton: boolean = false;
  userData: UserStorageModel;  
  skillList: Array<string> = new Array<string>();  
  base64Image: string = null;

  @Input('card-id')
  cardId: string;

  @Input('edit')
  editData: boolean = false;

  loaded: boolean = false;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public remoteServiceProvider: RemoteService,
    public alertCtrl: AlertController,
    private fb: FormBuilder,
    private translate: TranslateService,
    public storage: StorageService,
    public platform: Platform,
    public photo: PhotoServiceProvider) {      
  }

  loadCard(){
    if (!this.loaded) {
      this.userData = this.storage.getUserData();
    
      if (this.userData.AccessToken != null) {
        this.remoteServiceProvider.validateToken(this.userData.AccessToken).then(success => {
          console.log('Sucesso');
          this.userData = this.storage.getUserData();
        }, error => {
          this.navCtrl.push(LoginPage);
        });
      }

      if (this.editData) {
        this.remoteServiceProvider.getPersonalCard(this.userData.AccessToken, this.userData.ClientId, this.cardId).then(cardResponse => {
            this.card = cardResponse;
        }, error => {            
            let message: string = "unexpected_error";
            this.errorAlert(message, () => {});          
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
        Number: ['', Validators.compose([])],
        PostalCode: ['', Validators.compose([])],
        Neighborhood: ['', Validators.compose([])],
        City: ['', Validators.compose([])],
        State: ['', Validators.compose([])]
      });

      this.loaded = true;
    }

    return true;
  }

  addSkill(){
    if (this.form.controls['Skill'].value != "" && this.skillList.indexOf(this.form.controls['Skill'].value) == -1)
      this.skillList.push(this.form.controls['Skill'].value);

    this.form.controls['Skill'].reset();
  }

  saveCard(){

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

    cardModel.updateModel(this.base64Image, null, cardForm.Fullname, CardType.Personal, cardForm.Occupation, cardForm.PhoneNumber, 
      cardForm.Cellphone, cardForm.Email, cardForm.Website, cardForm.Facebook, cardForm.Twitter, cardForm.Linkedin, cardForm.Instagram, cardForm.GooglePlus, cardForm.Youtube, 
      null, null, cardForm.Address, cardForm.Address2, cardForm.Number, cardForm.PostalCode, cardForm.City, cardForm.Neighborhood, cardForm.State, cardForm.Bio, 
      this.skillList);

      if (!this.editData) {
        this.remoteServiceProvider.addPersonalCard(this.userData.AccessToken, this.userData.ClientId, cardModel).then(success => {      
          this.disabledButton = false;
    
          this.successAlert("information_successfully_saved", () => {
            this.navCtrl.setRoot(MainCardsPage);
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
      } else {
        this.remoteServiceProvider.updatePersonalCard(this.userData.AccessToken, this.userData.ClientId, this.cardId, cardModel).then(success => {      
          this.disabledButton = false;
    
          this.successAlert("information_successfully_saved", () => { 
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

  editAvatar() {
    let title: string = this.translate.instant("global.message.select_local_pick_image");
    let buttonCancel: string = this.translate.instant("global.button.cancel");
    let buttonCamera: string = this.translate.instant("global.button.camera");
    let buttonPhotoLibrary: string = this.translate.instant("global.button.photo_library");

    this.photo.SelectImage(title, buttonCamera, buttonPhotoLibrary, buttonCancel).then(result => {
      this.base64Image = result;
    }).catch(err => {
      this.base64Image = null;
      console.log(err);
    });    
  }

}
