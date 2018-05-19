import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoryPage } from '../category/category';
import { Http } from '@angular/http';
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

  categories: Array<{categoryName: string, assigned:boolean, videos:any}>

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.getVideos(http);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyCategoriesPage');
  }

  openCategoryPage(category) {
    console.log(category.categoryName);
    this.navCtrl.push(CategoryPage, {category: category});
  }

  getVideos(http:Http) {
      var videoDuration:string='short';
      var maxRes:string='4';
      var googleToken:string='AIzaSyDzxGVrr6vlmt-gZtqlkAdWhD4cdXZnwbs';
      var order:string='rating';
      var posts:any=[];

      var searches = [
        'Cloud Computing',
        'Bitcoins'
      ];

      var completed_requests = searches.length;
      this.categories = [];

      for (var i = 0; i < searches.length; i++) {

        let url="https://www.googleapis.com/youtube/v3/search?part=id,snippet"
          +"&q="+searches[i]
          +"&type=video&order="+order
          +"&maxResults="+maxRes
          +"&videoDuration="+videoDuration
          +"&key="+googleToken;

        this.http.get(url).map(res=>res.json()).subscribe(data=>{
          var category = {
            categoryName: '',
            assigned:true,
            videos:[]
          }
          category.categoryName = searches[searches.length-completed_requests];
          console.log(searches[searches.length-completed_requests]);
          category.assigned = true;
          category.videos = category.videos.concat(data.items);
          this.categories.push(category);
          completed_requests--;
          if(completed_requests == 0){
            console.log(this.categories);
          }
        });
      }
  }
}
