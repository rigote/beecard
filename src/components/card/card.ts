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

  text: string;

  constructor() {
    console.log('Hello CardComponent Component');
    this.text = 'Hello World';
  }

}
