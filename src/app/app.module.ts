import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';

import { ToDoListPage } from '../pages/to-do-list/to-do-list';
import { AboutPage } from './../pages/about/about';
import { ToDoProvider } from '../providers/to-do/to-do';

const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyBA3jlV0MY0tFOFxkkq7mE4U_rxUAQbaEA",
  authDomain: "to-do-d7a44.firebaseapp.com",
  databaseURL: "https://to-do-d7a44.firebaseio.com",
  storageBucket: "to-do-d7a44.appspot.com",
  messagingSenderId: "1014137598000"
};

@NgModule({
  declarations: [
    MyApp,
    ToDoListPage,
    AboutPage
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseAppConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ToDoListPage,
    AboutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ToDoProvider,
    ToDoProvider
  ]
})
export class AppModule {}
