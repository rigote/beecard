import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { CardModel, CardType } from '../../models/CardModel';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { RemoteService } from '../../providers/remote-service';
import { StorageService } from '../../providers/storage-service';
import { LoginPage } from '../login/login';
import { userInfo } from 'os';
import { MainCardsPage } from '../main-cards/main-cards';
import { UserStorageModel } from '../../models/StorageModel';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PhotoLibrary } from '@ionic-native/photo-library';

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

  form: FormGroup;
  card: CardModel;
  disabledButton: boolean = false;
  userData: UserStorageModel;  
  skillList: Array<string> = new Array<string>();  
  public options: CameraOptions = {
    quality: 60,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    cameraDirection: this.camera.Direction.FRONT,
    saveToPhotoAlbum: false
  };
  base64Image: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public remoteServiceProvider: RemoteService,
              public alertCtrl: AlertController,
              private fb: FormBuilder,
              private translate: TranslateService,
              public storage: StorageService,
              private camera: Camera,
              private photoLibrary: PhotoLibrary,
              public platform: Platform) {

    this.userData = this.storage.getUserData();
    
    if (this.userData.AccessToken != null) {
      this.remoteServiceProvider.validateToken(this.userData.AccessToken).then(success => {
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
      Number: ['', Validators.compose([])],
      PostalCode: ['', Validators.compose([])],
      Neighborhood: ['', Validators.compose([])],
      City: ['', Validators.compose([])],
      State: ['', Validators.compose([])],
      Twitter: ['', Validators.compose([])],
      Facebook: ['', Validators.compose([])],
      Linkedin: ['', Validators.compose([])],
      Instagram: ['', Validators.compose([])],
      GooglePlus: ['', Validators.compose([])],
      Youtube: ['', Validators.compose([])],
      Bio: ['', Validators.compose([])],
      Skill: ['', Validators.compose([])]
    });

  }

  addSkill(){
    if (this.form.controls['Skill'].value != "" && this.skillList.indexOf(this.form.controls['Skill'].value) == -1)
      this.skillList.push(this.form.controls['Skill'].value);

    this.form.controls['Skill'].reset();
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
      cardForm.Cellphone, cardForm.Email, cardForm.Website, cardForm.Facebook, cardForm.Twitter, cardForm.Linkedin, cardForm.Instagram, cardForm.GooglePlus, cardForm.Youtube, 
      null, null, cardForm.Address, cardForm.Address2, cardForm.Number, cardForm.PostalCode, cardForm.City, cardForm.Neighborhood, cardForm.State, cardForm.Bio, 
      this.skillList);

      this.remoteServiceProvider.addPersonalCard(this.userData.AccessToken, this.userData.ClientId, cardModel).then(success => {      
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

  editAvatar() {
    let selectOption = this.alertCtrl.create({
      title: this.translate.instant("page.create-card.button.edit-photo"),
      message: this.translate.instant("global.message.select_local_pick_image"),
      buttons: [
        {
          text: this.translate.instant("global.button.camera"),
          handler: () => {
            this.takePhoto();
          }
        },
        {
          text: this.translate.instant("global.button.photo_library"),
          handler: () => {
            this.photoLibrary.requestAuthorization().then(() => {
              this.photoLibrary.getLibrary().subscribe({
                next: library => {
                  library.forEach(function(libraryItem) {
                    console.log(libraryItem.id);          // ID of the photo
                    console.log(libraryItem.photoURL);    // Cross-platform access to photo
                    console.log(libraryItem.thumbnailURL);// Cross-platform access to thumbnail
                    console.log(libraryItem.fileName);
                    console.log(libraryItem.width);
                    console.log(libraryItem.height);
                    console.log(libraryItem.creationDate);
                    console.log(libraryItem.latitude);
                    console.log(libraryItem.longitude);
                    console.log(libraryItem.albumIds);    // array of ids of appropriate AlbumItem, only of includeAlbumsData was used
                  });
                },
                error: err => { console.log('could not get photos'); },
                complete: () => { console.log('done getting photos'); }
              });
            })
            .catch(err => console.log('permissions weren\'t granted'));
          }
        }
      ]
    });
    selectOption.present();
  }

  takePhoto(){
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
        this.base64Image = null;
        console.log(err);
      // Handle error
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateCardPage');
  }

}
