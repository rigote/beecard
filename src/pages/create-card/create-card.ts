import { Component } from '@angular/core';

@Component({
  selector: 'page-create-card',
  templateUrl: 'create-card.html'
})
export class CreateCardPage {

  public editData: boolean = false;

  constructor() {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateCardPage');
  }

}
