import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { TranslateService } from '@ngx-translate/core';

import { HomePage } from '../pages/home/home';
import { CreateCardPage } from '../pages/create-card/create-card';
import { LoginPage } from '../pages/login/login';


@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = HomePage;

  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform, translate: TranslateService) {
    
    translate.setDefaultLang('pt_BR');
    translate.use('pt_BR');

    this.initializeApp();
    
    //List pages
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Create Card', component: CreateCardPage },
      { title: 'Login', component: LoginPage },
    ];

  }

  initializeApp(){
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page){
    this.nav.setRoot(page.component);
  }
}
