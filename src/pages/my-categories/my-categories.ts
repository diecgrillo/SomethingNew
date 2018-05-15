import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoryPage } from '../category/category';

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

  categories: Array<{categoryName: string, assigned:boolean, videos:Array<{title: string, desc:string, image:string}>}>

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.categories = [
      { categoryName: 'Cloud Computing',
        assigned: false,
        videos: [{ title: 'Cloud Computing Explained',
                    desc:'Curabitur non libero eget mi eleifend ornare. Fusce eget odio quis mauris malesuada aliquam. Phasellus at libero velit. Aliquam vel eleifend arcu, non malesuada turpis. Duis varius rhoncus pretium.',
                    image:'assets/imgs/videos/cloud1.jpg'},
                { title: 'Cloud Computing Services Models - IaaS PaaS SaaS Explained',
                    desc:'Vivamus elementum tincidunt odio, elementum mattis turpis commodo rhoncus. Quisque posuere, libero et egestas suscipit, nibh quam tempus velit, quis ornare lacus nibh ac turpis. ',
                    image:'assets/imgs/videos/cloud2.jpg'},
                { title: 'Introduction to Cloud Computing',
                    desc:'Nullam id aliquam eros. Nam ut mollis neque, vel hendrerit ligula. Nam sed nunc maximus, euismod nisi ut, pulvinar risus.',
                    image:'assets/imgs/videos/cloud3.jpg'},
                { title: 'What is Cloud Computing? - Amazon Web Services',
                    desc:'Sed placerat, augue non commodo auctor, eros tortor ultricies eros, eget finibus felis ex sed neque.',
                    image:'assets/imgs/videos/cloud4.jpg'}]
      }
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyCategoriesPage');
  }

  openCategoryPage(category) {
    console.log(category.categoryName);
    this.navCtrl.push(CategoryPage, {category: category});
  }

}
