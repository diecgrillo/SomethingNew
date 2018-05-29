import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the VideosByCategory provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VideosByCategoryProvider {
  data:any;
  url:string="http://localhost:3000/category";

  constructor(public http: Http) {
    console.log('Hello VideosByCategoryProvider');
  }

  load():Promise<any>{
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.
      this.http.get(this.url)
        .map(res => res.json())
        .subscribe(
          results=>{
            this.data=results;
            resolve(this.data);
          },
          err => {
            this.data = undefined;
            resolve(this.data);
            console.log(err);
          }
        );
    });
  }

  getCategories(){
    return this.data;
  }

  getCategoriesByIDs(iDs){
    if(this.data){
      var categories:Array<{name:string,videos:any,_id:string}>;
      categories=this.data;
      var categoriesById=[];

      for(let j=0;j<iDs.length;j++){
        for(let i=0;i<categories.length;i++){

          if(iDs[j] == categories[i]._id){
            categoriesById.push(categories[i]);
            console.log("iDs" + iDs[j]);
            break;
          }
        }
      }
      console.log("categoriesById="+categoriesById);
      return categoriesById;
    }
  }

}
