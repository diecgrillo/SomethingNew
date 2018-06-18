import { LocalNotifications } from '@ionic-native/local-notifications';
import { Injectable } from '@angular/core';
import { VideosByCategoryProvider } from '../videos-by-category/videos-by-category'

/*
  Generated class for the NotificationsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const HOUR=12;

@Injectable()
export class NotificationsProvider {


  constructor(private localNotifications: LocalNotifications, private videosByCategoryProvider: VideosByCategoryProvider) {
  }

  refreshCategories(userCategories:any){
    this.localNotifications.cancelAll().then(()=>{
      let categories = this.videosByCategoryProvider.getCategoriesByIDs(userCategories.subscribedCategories);
      let notWatchedVideos: any[] = [];
      for(let i=0; i<categories.length; i++){
        for(let j=0; j<categories[i].videos.length; j++){
          if(userCategories.watchedVideos.indexOf(categories[i].videos[j]._id) == -1){
            notWatchedVideos.push(
              {
                category: categories[i],
                video: categories[i].videos[j]
              });
          }
        }
      }

      let lim = 0;

       while(notWatchedVideos.length > 0 && lim <= 10){
         let removed = notWatchedVideos.splice(Math.floor(Math.random()*notWatchedVideos.length), 1);
         let date:Date = new Date(new Date().getTime() + 5 * 1000);
         date.setDate(date.getDate()+lim);
         if(removed.length > 0){
            this.localNotifications.schedule({
               id:lim,
               title: 'You have a new video recommendation',
               text: removed[0].video.snippet.title,
               trigger: {at: date},
               data: { category: removed[0].category, video:removed[0].video },
               led: 'FF0000',
               icon:'file://assets/icon/icon.png',
               smallIcon:'res://ic_stat_smallicon',
               sound: null
            });

        }
        lim++;
      }

    });

  }

}
