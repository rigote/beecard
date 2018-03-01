import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { TranslateService } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';


import { HomePage } from '../pages/home/home';
import { CreateCardPage } from '../pages/create-card/create-card';
import { LoginPage } from '../pages/login/login';
import { ScanQrCodePage } from '../pages/scan-qr-code/scan-qr-code';
import { MainCardsPage } from '../pages/main-cards/main-cards';
import { ListsPage } from '../pages/lists/lists';
import { AccountPage } from '../pages/account/account';
import { SettingsPage } from '../pages/settings/settings';
import { FeedPage } from '../pages/feed/feed';
import { PhisicalCardsPage } from '../pages/phisical-cards/phisical-cards';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { SignupPage } from '../pages/signup/signup';
import { StorageService } from '../providers/storage-service';

@Component({
  templateUrl: 'app.html'
})

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PhisicalCardsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PhisicalCardsPage
  ],
  providers: []
})


export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = LoginPage;

  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform, translate: TranslateService, public storage: StorageService) {
    
    translate.setDefaultLang('pt_BR');

    let language = storage.getLanguage();

    if (language != null)
      translate.use(language);
    else
      storage.setLanguage('pt_BR');

    this.initializeApp();
    
    //List pages
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Create Card', component: CreateCardPage },
      { title: 'Login', component: LoginPage },
      { title: 'Scan QrCode', component: ScanQrCodePage },
      { title: 'Main Cards', component: MainCardsPage },
      { title: 'Lists', component: ListsPage },
      { title: 'Account', component: AccountPage },
      { title: 'Settings', component: SettingsPage },
      { title: 'Feed', component: FeedPage },
      { title: 'Cartões Físicos', component: PhisicalCardsPage }
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

  logoff(){
    this.storage.clearStorageData();
    this.nav.setRoot(LoginPage);
  }
}
