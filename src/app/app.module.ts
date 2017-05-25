import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';
import { PagesModule } from '../pages/pages.module';

export const firebaseConfig = {
   apiKey: "AIzaSyCqCZpsRZwqtQpDjsTuPI3mWOTfQMN0hAM",
    authDomain: "team-builder-4c78a.firebaseapp.com",
    databaseURL: "https://team-builder-4c78a.firebaseio.com",
    projectId: "team-builder-4c78a",
    storageBucket: "team-builder-4c78a.appspot.com",
    messagingSenderId: "781814977111"
};

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    PagesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
