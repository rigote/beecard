import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { RemoteService } from '../providers/remote-service';
import { StorageService } from '../providers/storage-service';

import { HomePage } from '../pages/home/home';
import { CreateCardPage } from '../pages/create-card/create-card';
import { FloatMainNavPage } from '../pages/float-main-nav/float-main-nav';
import { LoginPage } from '../pages/login/login';
import { ScanQrCodePage } from '../pages/scan-qr-code/scan-qr-code';
import { MainCardsPage } from '../pages/main-cards/main-cards';
import { ListsPage } from '../pages/lists/lists';
import { AccountPage } from '../pages/account/account';
import { SettingsPage } from '../pages/settings/settings';
import { FeedPage } from '../pages/feed/feed';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { SignupPage } from '../pages/signup/signup';
import { CardProfilePage } from './../pages/card-profile/card-profile';
import { ListActionsPage } from './../pages/list-actions/list-actions';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpModule, Http } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { FlashCardComponent } from '../components/flash-card/flash-card';

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CreateCardPage,
    FloatMainNavPage,
    LoginPage,
    FlashCardComponent,
    ScanQrCodePage,
    ListsPage,
    AccountPage,
    SettingsPage,
    MainCardsPage,
    FeedPage,
    ForgotPasswordPage,
    SignupPage,
    CardProfilePage,
    ListActionsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    HttpModule,
    BrowserModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CreateCardPage,
    FloatMainNavPage,
    LoginPage,
    ScanQrCodePage,
    ListsPage,
    AccountPage,
    SettingsPage,
    MainCardsPage,
    FeedPage,
    ForgotPasswordPage,
    SignupPage,
    CardProfilePage,
    ListActionsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, BarcodeScanner, RemoteService, StorageService]
})
export class AppModule {}
