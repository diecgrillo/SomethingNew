import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoryPage } from '../category/category';
import { VideosByCategoryProvider } from '../../providers/videos-by-category/videos-by-category';
import 'rxjs/add/operator/map';
/**
 * Generated class for the MyCategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-categories',
  templateUrl: 'my-categories.html',
})
export class MyCategoriesPage {

  categories: Array<{name: string, videos:any}>

  constructor(public navCtrl: NavController, public navParams: NavParams, public videosByCategoryProvider: VideosByCategoryProvider) {
    videosByCategoryProvider.load().then(data => {
      this.categories = data;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyCategoriesPage');
  }

  openCategoryPage(category) {
    console.log(category.categoryName);
    this.navCtrl.push(CategoryPage, {category: category});
  }

}
