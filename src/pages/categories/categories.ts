import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';
import { CategoryPage } from '../category/category';
import { VideosByCategoryProvider } from '../../providers/videos-by-category/videos-by-category';
import { UserInfoProvider } from '../../providers/user-info/user-info';

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

  categories: Array<{name: string, assigned: boolean, _id:string, videos:any}>
  loadFailed:boolean=false;
  userCategories: {
    subscribedCategories : string[],
    watchedVideos : string[]
  };


  constructor(public navCtrl: NavController,
    public alerCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public videosByCategoryProvider: VideosByCategoryProvider,
    public userInfoProvider:UserInfoProvider) {

  }

  ionViewDidLoad() {
    this.loadContent();
  }

  loadContent(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present().then( () =>
    {
      this.videosByCategoryProvider.load().then(data => {
        console.log("data="+data)
        if(data){
          this.loadFailed = false;
        } else {
          loading.dismiss();
          this.loadFailed = true;
          return;
        }
        this.categories = data;

        //TODO Check if user is authenticated

        this.userInfoProvider.loadFromLocalStorage().then(data => {
          console.log(data);
          this.userCategories = data;

          for(let i=0;i < this.categories.length; i++)
          {
            if(this.userCategories
              && this.userCategories.subscribedCategories
              && this.userCategories.subscribedCategories.find(x=>x==this.categories[i]._id)){
              this.categories[i].assigned=true;
            } else {
              this.categories[i].assigned=false;
            }
          }
          loading.dismiss();
        });
      });
    });
  }

  subscribe(category) {

    let message:string;
    if(category.assigned)
      message = 'Do you want to subscribe to "' + category.name + '" category?'
    else
      message = 'Do you want to unsubscribe to "' + category.name + '" category?'

    category.assigned=!category.assigned;

    let confirm = this.alerCtrl.create({
      //title: 'Subscription',
      message: message,
      buttons: [
      {
        text: 'No'
      },
      {
        text: 'Yes',
        handler: () => {
          this.yesHandler(category);
        }
      }]
    });
    confirm.present()
  }

  openCategoryPage(category) {
    console.log(category.categoryName);
    this.navCtrl.push(CategoryPage, {category: category});
  }

  yesHandler(category) {
    category.assigned=!category.assigned;
    if(category.assigned){
      this.userCategories.subscribedCategories.push(category._id);
    } else {
      var idx = this.userCategories.subscribedCategories.indexOf(category._id);
      if (idx != -1) {
        this.userCategories.subscribedCategories.splice(idx, 1);
      } else {
        console.log("Error");
      }
    }
    this.userInfoProvider.storeChanges(this.userCategories);
  }
}
