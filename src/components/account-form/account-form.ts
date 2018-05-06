import { Component, Input } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { RemoteService } from '../../providers/remote-service';
import { UserModel } from '../../models/UserModel';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { debug } from 'util';
import { HomePage } from '../../pages/home/home';
import { AuthModel } from '../../models/AuthModel';
import { StorageService } from '../../providers/storage-service';
import { PhotoServiceProvider } from '../../providers/photo-service';
import { UserStorageModel } from '../../models/StorageModel';
import { LoginPage } from '../../pages/login/login';

@Component({
  selector: 'account-form',
  templateUrl: 'account-form.html',
  providers: [RemoteService]
})
export class AccountFormComponent {

  public form: FormGroup;
  public user: UserModel;
  public disabledButton: boolean = false;  
  public strongRegex: RegExp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  public mediumRegex: RegExp = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
  public avatarImage: string = null;
  private userData: UserStorageModel;
  
  @Input('edit') 
  editData: boolean = false;

  loaded: boolean = false;

  constructor(public navCtrl: NavController, 
    public alertCtrl: AlertController,
    public navParams: NavParams, 
    public remoteServiceProvider: RemoteService,
    private fb: FormBuilder,
    private translate: TranslateService,
    public storage: StorageService,
    private loadingCtrl: LoadingController,
    public photoService: PhotoServiceProvider) {
  
  }

  editAvatar() {
    let title: string = this.translate.instant("global.message.select_local_pick_image");
    let buttonCancel: string = this.translate.instant("global.button.cancel");
    let buttonCamera: string = this.translate.instant("global.button.camera");
    let buttonPhotoLibrary: string = this.translate.instant("global.button.photo_library");

    this.photoService.SelectImage(title, buttonCamera, buttonPhotoLibrary, buttonCancel).then(photo => { 
      this.avatarImage = photo; 
    }).catch(err => { 
      this.avatarImage = null; 
    });;
  }

  loadUser(): boolean {

    if (!this.loaded) {
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
        Password: ['', Validators.compose(!this.editData ? [
          Validators.minLength(6),
          Validators.maxLength(20),
          Validators.required
        ] : [])],
        ConfirmPassword: ['', Validators.compose([])],
        PhoneNumber: ['', Validators.compose([
          Validators.minLength(10),
          Validators.required
        ])],
        Birthdate: ['', Validators.compose([
          Validators.required
        ])],
      });
      
      if (this.editData) {
        let loader = this.loadingCtrl.create({ content: this.translate.instant("global.message.load_profile")});
        loader.present();
        this.userData = this.storage.getUserData();
        
        if (this.userData.AccessToken != null) {
          this.remoteServiceProvider.validateToken(this.userData.AccessToken).then(success => {
            console.log('Sucesso');
          }, error => {
            this.navCtrl.setRoot(LoginPage);
          });
        } else {
          this.navCtrl.setRoot(LoginPage);
        }
        
        this.remoteServiceProvider.getUser(this.userData.AccessToken, this.userData.ClientId).then(success => {        
          this.form.controls['Firstname'].setValue(success.Firstname);
          this.form.controls['Lastname'].setValue(success.Lastname);
          this.form.controls['Email'].setValue(success.Email);
          this.form.controls['PhoneNumber'].setValue(success.PhoneNumber);
          this.form.controls['Birthdate'].setValue(success.Birthdate);
          this.avatarImage = success.AvatarBase64;
          loader.dismiss();
        }, error => {
  
        });
      }

      this.loaded = true;
    }
  
    return true;
  }

  saveUser(){
    let loader = this.loadingCtrl.create({ content: this.translate.instant("global.message.save_profile")});
    loader.present();
    this.disabledButton = true;

    var userForm = this.form.value;   

    if (this.form.invalid || this.form.dirty) {
      
      this.disabledButton = false;
      
      if (this.form.controls['Firstname'].errors) {
        if (this.form.controls['Firstname'].errors.required)
          this.errorAlert("firstname_required", () => {});

        if (this.form.controls['Firstname'].errors.minlength || this.form.controls['Firstname'].errors.maxlength)
          this.errorAlert("firstname_length", () => {});

        return false;
      }      

      if (this.form.controls['Lastname'].errors) {
        if (this.form.controls['Lastname'].errors.required)
          this.errorAlert("lastname_required", () => {});

        if (this.form.controls['Lastname'].errors.minlength || this.form.controls['Lastname'].errors.maxlength)
          this.errorAlert("lastname_length", () => {});

        return false;
      }

      if (this.form.controls['Email'].errors) {
        if (this.form.controls['Email'].errors.required)
          this.errorAlert("email_required", () => {});

        if (this.form.controls['Email'].errors.minlength || this.form.controls['Email'].errors.maxlength)
          this.errorAlert("email_length", () => {});

        return false;
      }

      if (this.form.controls['Birthdate'].errors) {
        if (this.form.controls['Birthdate'].errors.required)
          this.errorAlert("birthdate_required", () => {});

        if (new Date(userForm.Birthdate).getTime() > Date.now())
          this.errorAlert("birthdate_must_be_lower_than_current_date", () => {});

        return false;
      } 

      if (this.form.controls['Password'].errors) {
        if (this.form.controls['Password'].errors.required)
          this.errorAlert("password_required", () => {});

        if (this.form.controls['Password'].errors.minlength || this.form.controls['Password'].errors.maxlength)
          this.errorAlert("password_length", () => {});

        return false;
      }

      if (!this.editData && userForm.Password != userForm.ConfirmPassword) {
        this.errorAlert("password_confirmation_not_match", () => {});
        return false;
      }

      if (this.form.controls['PhoneNumber'].errors) {
        if (this.form.controls['PhoneNumber'].errors.required)
          this.errorAlert("phonenumber_required", () => {});

        if (this.form.controls['PhoneNumber'].errors.minlength)
          this.errorAlert("phonenumber_length", () => {});

        return false;
      }
    }

    this.user = new UserModel();
    this.user.updateModel(userForm.Firstname, 
                          userForm.Lastname, 
                          userForm.Email, 
                          userForm.Password,
                          userForm.PhoneNumber, 
                          new Date(userForm.Birthdate), 
                          this.avatarImage, 
                          null, 
                          true);

    if (!this.editData) {
      this.remoteServiceProvider.addUser(this.user).then(success => {      
        this.disabledButton = false;
  
        this.successAlert("information_successfully_saved", () => {
          this.remoteServiceProvider.generateToken(userForm.Email, userForm.Password).then(auth => {
            this.disabledButton = false;
            this.storage.setUserData(auth.Token, auth.ClientId);
            loader.dismiss();
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
        });
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
  
      });
    } else {
      this.remoteServiceProvider.updateUser(this.userData.AccessToken, this.userData.ClientId, this.user).then(success => {      
        this.disabledButton = false;
  
        this.successAlert("information_successfully_saved", () => {
            loader.dismiss();
            this.navCtrl.setRoot(HomePage);
        });
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
  
      });
    }
  }

  validatePassword(value: string): number{   
    if(this.strongRegex.test(value)) {
      return 3;
    } else if(this.mediumRegex.test(value)) {
      return 2;
    } else if (typeof value != 'undefined' && value.length > 6) {
      return 1;
    } else {
      return 0;
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
    
  }

}
