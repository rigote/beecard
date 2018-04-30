import { Component } from '@angular/core';

/**
 * Generated class for the CardComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'card',
  templateUrl: 'card.html'
})
export class CardComponent {

  flipped: boolean = false;

  constructor() {
    
  }

  flip(){
    this.flipped = !this.flipped;
  }

}
