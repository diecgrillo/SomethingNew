import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { CategoriesPage } from '../pages/categories/categories';
import { MyCategoriesPage } from '../pages/my-categories/my-categories';
import { SettingsPage } from '../pages/settings/settings';
import { VideoPlayerPage } from '../pages/video-player/video-player';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = CategoriesPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public localNotifications: LocalNotifications) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Videos Catalog', component: CategoriesPage },
      { title: 'My Videos', component: MyCategoriesPage },
      { title: 'Settings', component: SettingsPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.localNotifications.on('click').subscribe((notification)=> {
        console.log("notification data= "+notification.data);
        //let teste = JSON.parse(data);
        //console.log("teste="+teste);
        this.nav.push(VideoPlayerPage, {video: notification.data.video, category: notification.data.category});
      })
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.title.localeCompare("Settings") == 0){
      this.nav.push(page.component);
    }
    else {
      this.nav.setRoot(page.component);
    }
  }
}
