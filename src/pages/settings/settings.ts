import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LanguagePage } from '../language/language';
import { AccountPage } from '../account/account';
import { NotificationsPage } from '../notifications/notifications';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  items: Array<{title: string, component: any}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // used for an example of ngFor and navigation
    this.items = [
      { title: 'Account', component: AccountPage },
      { title: 'Notifications', component: NotificationsPage },
      { title: 'Language', component: LanguagePage }
    ];
  }

  itemSelected(item) {
    console.log(item.title);
    this.navCtrl.push(item.component);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

}
