import { HelloIonicModule } from './../pages/hello-ionic/hello-ionic.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { LoginPage } from './../pages/login/login-page';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { FCM } from '@ionic-native/fcm';

export const firebaseConfig = {
  apiKey: "AIzaSyDFjTafqFeQuCFWv5EouVe6VvjhWIi3cKI",
  authDomain: "testproject-5bf4a.firebaseapp.com",
  databaseURL: "https://testproject-5bf4a.firebaseio.com",
  projectId : "testproject-5bf4a",
  storageBucket: "testproject-5bf4a.appspot.com",
  messagingSenderId: '<462438335116>'
};

@NgModule({
  declarations: [
    MyApp,
    ItemDetailsPage,
    ListPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    HelloIonicModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ItemDetailsPage,
    ListPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    FCM,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
