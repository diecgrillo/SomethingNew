import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { CategoriesPage } from '../pages/categories/categories';
import { MyCategoriesPage } from '../pages/my-categories/my-categories';
import { SettingsPage } from '../pages/settings/settings';
import { LanguagePage } from '../pages/language/language';
import { AccountPage } from '../pages/account/account';
import { NotificationsPage } from '../pages/notifications/notifications';
import { CategoryPage } from '../pages/category/category';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    CategoriesPage,
    MyCategoriesPage,
    SettingsPage,
    LanguagePage,
    AccountPage,
    NotificationsPage,
    CategoryPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CategoriesPage,
    MyCategoriesPage,
    SettingsPage,
    LanguagePage,
    AccountPage,
    NotificationsPage,
    CategoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
