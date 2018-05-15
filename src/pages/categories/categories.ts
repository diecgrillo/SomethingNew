import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoryPage } from '../category/category';

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

  categories: Array<{categoryName: string, assigned:boolean, videos:Array<{title: string, desc:string, image:string}>}>

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.categories = [
      { categoryName: 'Software Development',
        assigned: true,
        videos: [{ title: 'What is Software Development',
                    desc:'Morbi sed dui tincidunt, maximus leo vitae, feugiat felis. Mauris sed bibendum leo. Integer in lorem leo. Nullam viverra odio eu lorem imperdiet eleifend. Integer gravida aliquet vestibulum.',
                    image:'assets/imgs/videos/dev1.jpg'},
                { title: 'Day in the Life: Software Engineer',
                    desc:'Mauris eros turpis, dictum id quam et, cursus sodales velit. Vivamus euismod et massa quis condimentum. Integer blandit mi turpis, id aliquam libero imperdiet non.',
                    image:'assets/imgs/videos/dev2.jpg'},
                { title: 'Intro to Scrum in Under 10 Minutes',
                    desc:'Morbi fermentum lobortis ligula, nec fermentum magna interdum id. Suspendisse potenti. Ut augue risus, rutrum at vulputate et, euismod ac enim.',
                    image:'assets/imgs/videos/dev3.jpg'},
                { title: 'What is an SDK? (Software Development Kit)',
                    desc:'Nunc aliquet placerat tellus, a ornare est auctor a. Suspendisse sit amet neque mi. Aenean porta, nisi sed imperdiet scelerisque, erat libero suscipit nisl, quis sagittis nibh quam eu risus.',
                    image:'assets/imgs/videos/dev4.jpg'}]
      },
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
    console.log('ionViewDidLoad CategoriesPage');
  }

  openCategoryPage(category) {
    console.log(category.categoryName);
    this.navCtrl.push(CategoryPage, {category: category});
  }
}
