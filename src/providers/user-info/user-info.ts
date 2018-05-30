import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the UserInfoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const USER_INFO_KEY = "USER_INFO_KEY";

@Injectable()
export class UserInfoProvider {

  data:any;

  constructor(public storage: Storage) {

  }

  loadFromServer(){
    // TODO create funciton load from server
  }

  loadFromLocalStorage(){
    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.
      this.storage.get(USER_INFO_KEY).then(
          results=>{
            if(results == null){
              results = {
                subscribedCategories : [],
                watchedVideos : []
              }
            }
            this.data=results;
            resolve(this.data);
          },
          err => {
            console.log(err);
            //TODO handle error in storage
            this.data = {
              subscribedCategories : [],
              watchedVideos : []
            }
            resolve(this.data);
          });
      });

  }





  storeChanges(categories:any):Promise<any>{
    this.data = categories
    console.log("UserInfoProvider.storeChanges data="+this.data);
    return this.storage.set(USER_INFO_KEY,this.data);
  }

}
