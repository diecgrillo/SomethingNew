import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { UserInfoProvider } from '../../providers/user-info/user-info';

/**
 * Generated class for the VideoPlayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-video-player',
  templateUrl: 'video-player.html',
})
export class VideoPlayerPage {

  currentVideo:any=undefined;

  category:{
    name:string,
    videos:any
  }

  userCategories: {
    subscribedCategories : string[],
    watchedVideos : string[]
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public userInfoProvider: UserInfoProvider) {
    this.currentVideo = navParams.get('video');
    this.category = navParams.get('category');
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
      //TODO Check if user is authenticated

      this.userInfoProvider.loadFromLocalStorage().then((data:{
        subscribedCategories : string[],
        watchedVideos : string[]
      }) => {
        this.userCategories = data;
        loading.dismiss();
      });

    });
  }

  openCategoryPage(video) {
    this.navCtrl.push(VideoPlayerPage, {video: video, category: this.category});
  }

  isWatchedVideo(id:string):boolean{
    if(this.userCategories){
      let index:number = this.userCategories.watchedVideos.indexOf(id);
      if(index != -1)
        return true;
    }
    return false;
  }
}
