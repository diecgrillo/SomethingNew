import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoryPage } from '../category/category';
import { VideosByCategoryProvider } from '../../providers/videos-by-category/videos-by-category';

/**
 * Generated class for the CategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  /*categories: Array<{categoryName: string, assigned:boolean, videos:Array<{title: string, desc:string, image:string}>}>*/
  categories: Array<{name: string, videos:any}>
  assigned:boolean=false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public videosByCategoryProvider: VideosByCategoryProvider) {
    videosByCategoryProvider.load().then(data => {
      this.categories = data;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesPage');
  }

  openCategoryPage(category) {
    console.log(category.categoryName);
    this.navCtrl.push(CategoryPage, {category: category});
  }
}
