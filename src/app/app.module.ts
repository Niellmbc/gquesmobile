import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SettingsPage } from '../pages/settings/settings';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FinancePage } from '../pages/finance/finance';
import { TicketPage } from '../pages/ticket/ticket';
import { DataProvider } from '../providers/data/data';
import { CashierPage } from '../pages/cashier/cashier';
import { RegistrarPage } from '../pages/registrar/registrar';
import { HttpModule } from '@angular/http';
import { InfoEachCashierPage } from '../pages/info-each-cashier/info-each-cashier';
import { TransactionListPage } from '../pages/transaction-list/transaction-list';
import { PusherProvider } from '../providers/pusher/pusher';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    LoginPage,
    SettingsPage,
    FinancePage,
    TicketPage,
    CashierPage,
    RegistrarPage,
    InfoEachCashierPage,
    TransactionListPage



  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    LoginPage,
    SettingsPage,
    FinancePage,
    TicketPage,
    CashierPage,
    RegistrarPage,
    InfoEachCashierPage,
    TransactionListPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    PusherProvider,
    LocalNotifications
  ]
})
export class AppModule {}
