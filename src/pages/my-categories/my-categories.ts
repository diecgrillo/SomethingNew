import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';
import { CategoryPage } from '../category/category';
import { VideosByCategoryProvider } from '../../providers/videos-by-category/videos-by-category';
import { UserInfoProvider } from '../../providers/user-info/user-info';
import { NotificationsProvider } from '../../providers/notifications/notifications';

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
    public userInfoProvider:UserInfoProvider,
    public notificationsProvider:NotificationsProvider) {

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
        if(data){
          this.loadFailed = false;
        } else {
          loading.dismiss();
          this.loadFailed = true;
          return;
        }
        this.categories = data;

        //TODO Check if user is authenticated

        this.userInfoProvider.loadFromLocalStorage().then((data:{
          subscribedCategories : string[],
          watchedVideos : string[]
        }) => {

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
    this.navCtrl.push(CategoryPage, {category: category});
  }

  yesHandler(category) {
    category.assigned=!category.assigned;
    var idx = this.userCategories.subscribedCategories.indexOf(category._id);
    if(category.assigned){
      if (idx == -1) {
        this.userCategories.subscribedCategories.push(category._id);
        this.notificationsProvider.refreshCategories(this.userCategories);
      }
    } else {
      if (idx != -1) {
        this.userCategories.subscribedCategories.splice(idx, 1);
        this.notificationsProvider.refreshCategories(this.userCategories);
      } else {
        //TODO handle this error
        console.log("Error");
      }
    }
    this.userInfoProvider.storeChanges(this.userCategories);
  }
}
