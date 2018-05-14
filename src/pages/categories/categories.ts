import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  categories: Array<{categoryName: string, color:string, videos:Array<{desc: string, image:string}>}>

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.categories = [
      { categoryName: 'Category1',
        color: '#8484e1',
        videos: [{ desc: 'What is Software Development', image:'assets/imgs/videos/dev1.jpg'},
                { desc: 'Day in the Life: Software Engineer', image:'assets/imgs/videos/dev2.jpg'},
                { desc: 'Intro to Scrum in Under 10 Minutes', image:'assets/imgs/videos/dev3.jpg'},
                { desc: 'What is an SDK? (Software Development Kit)', image:'assets/imgs/videos/dev4.jpg'}]
      },
      { categoryName: 'Category2',
        color: '#d6d6f5',
        videos: [{ desc: 'Item1', image:'img/image1.jpg'},
                { desc: 'Item1', image:'img/image1.jpg'},
                { desc: 'Item1', image:'img/image1.jpg'},
                { desc: 'Item1', image:'img/image1.jpg'}]
      }
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesPage');
  }

  setStyles(category) {
    let styles = {
      'background-color': category.color
    };
    return styles;
  }

}
