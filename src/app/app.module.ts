import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { CreateCardPage } from '../pages/create-card/create-card';
import { FloatMainNavPage } from '../pages/float-main-nav/float-main-nav';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CreateCardPage,
    FloatMainNavPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CreateCardPage,
    FloatMainNavPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
