import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  video:any=[];
  category:{
    categoryName:string,
    assigned:boolean,
    videos:any
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.video = navParams.get('video');
    this.category = navParams.get('category');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideoPlayerPage');
  }

  openCategoryPage(video) {
    this.navCtrl.push(VideoPlayerPage, {video: video, category: this.category});
  }
}
