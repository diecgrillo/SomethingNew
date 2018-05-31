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
    this.localNotifications.cancelAll();

    let categories = this.videosByCategoryProvider.getCategoriesByIDs(userCategories.subscribedCategories);
    let notWatchedVideos: any[] = [];
    for(let i=0; i<categories.length; i++){
      for(let j=0; j<categories[i].videos.length; j++){
        if(userCategories.watchedVideos.indexOf(categories[i].videos[j]._id) == -1){
          notWatchedVideos.push(
            {
              categoryId: categories[i]._id,
              video: categories[i].videos[j]
            });
        }
      }
    }

    let lim = 1;
    let date = new Date();
    date.setHours(HOUR,0,0,0);

    while(notWatchedVideos.length > 0 && lim <= 30){
      let removed = notWatchedVideos.splice(Math.floor(Math.random()*notWatchedVideos.length), 1);
      if(removed.length > 0){

        this.localNotifications.schedule({
          id: lim,
          text: 'Single ILocalNotification',
          trigger: {at: date},
          data: { secret: removed }
        });
        date.setDate(date.getDate()+1);
      }
      lim++;
    }
  }

}
