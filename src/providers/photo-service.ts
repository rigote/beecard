import { Injectable, Component } from '@angular/core';
import 'rxjs/add/operator/map';
import { Platform, ActionSheetController } from 'ionic-angular'
import { Camera, CameraOptions } from '@ionic-native/camera';

@Injectable()
export class PhotoServiceProvider {

  private options: CameraOptions = {
    quality: 60,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    cameraDirection: this.camera.Direction.FRONT,
    saveToPhotoAlbum: false
  };

  constructor(private camera: Camera,
              public actionSheetCtrl: ActionSheetController) {
  }

  SelectImage(titleAlertText: string, cameraButtonText: string, photoLibraryButtonText: string, cancelButtonText: string): Promise<string> {
    return new Promise((resolve, reject) => {
      let actionSheet = this.actionSheetCtrl.create({
        title: titleAlertText,
        buttons: [          
          {
            text: cameraButtonText,
            handler: () => {
              this.TakePhoto().then(photo => {
                resolve(photo);
              }).catch(err => {
                reject(err);
              });
            }
          },
          {
            text: photoLibraryButtonText,
            handler: () => {
              this.PickPhoto().then(photo => {
                resolve(photo);
              }).catch(err => {
                reject(err);
              });
            }
          },
          {
            text: cancelButtonText,
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
   
      actionSheet.present();      
    });    
  }

  TakePhoto(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.options.sourceType = this.camera.PictureSourceType.CAMERA;
      this.camera.getPicture(this.options).then((imageData) => {      
        resolve('data:image/jpeg;base64,' + imageData);
      }, (err) => {
        console.log(err);
        reject(reject('could not take photo'));
      });
    });
  }

  PickPhoto(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.options.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
      this.camera.getPicture(this.options).then((imageData) => {      
        resolve('data:image/jpeg;base64,' + imageData);
      }, (err) => {
        console.log(err);
        reject(reject('could not take photo'));
      });
    });
  }

}