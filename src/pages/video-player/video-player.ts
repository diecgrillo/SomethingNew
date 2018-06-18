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

  player:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public userInfoProvider: UserInfoProvider) {

    this.currentVideo = navParams.get('video');
    this.category = navParams.get('category');
console.log(this.category);
console.log(this.currentVideo);
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

  init() {
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  ngOnInit() {
    this.init();
    window['onYouTubeIframeAPIReady'] = (e) => {
      this.player = new window['YT'].Player('player', {
        events: {
          'onStateChange': this.onPlayerStateChange.bind(this),
          'onError': this.onPlayerError.bind(this),
          'onReady': this.onReady.bind(this)
        }
      });
    };
  }

  onPlayerStateChange(event) {
    switch (event.data) {
      case window['YT'].PlayerState.PLAYING:
        //Video started
        if (this.cleanTime() == 0) {
          if(this.  userCategories && this.userCategories.watchedVideos){
            let index = this.userCategories.watchedVideos.indexOf(this.currentVideo._id);
            if(index == -1){
              this.userCategories.watchedVideos.push(this.currentVideo._id);
              this.userInfoProvider.storeChanges(this.userCategories);
            }
          } else {
            // TODO handle error
          }
        //Video is playing
        } else {
          console.log('playing ' + this.cleanTime())
        };
        break;
      // TODO collect statistics
      // case window['YT'].PlayerState.PAUSED:
      //   if (this.player.getDuration() - this.player.getCurrentTime() != 0) {
      //     console.log('paused' + ' @ ' + this.cleanTime());
      //   };
      //   break;
      // case window['YT'].PlayerState.ENDED:
      //   console.log('ended ');
      //   break;
    }
  };
  //utility
  cleanTime() {
    return Math.round(this.player.getCurrentTime());
  };

  onReady(){
    // TODO lazy loading
  }

  onPlayerError(event) {
    // TODO Handle Error
  };

}
