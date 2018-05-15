import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
  category:{
    categoryName:string,
    assigned:boolean,
    videos:Array<{title: string, desc:string, image:string}>
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.category = navParams.get('category');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
  }

}
