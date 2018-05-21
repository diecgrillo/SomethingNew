import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { forkJoin } from "rxjs/observable/forkJoin";
/*
  Generated class for the YouTubeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class YouTubeProvider {

  data:any;

  constructor(public http: Http) {
    console.log('Hello YouTubeProvider Provider');
  }

  load() {
    if (this.data) {
      return this.data;
    }

    this.data = [];

    var searches = [
      'Software Development',
      'Cloud Computing',
      'Bitcoins'
    ];

    var promises = [];
    for (let i = 0; i < searches.length; ++i) {
      promises.push(this.getVideo(searches[i]));
    }

    forkJoin(promises).subscribe((results:any)=>
      {
        for(let i = 0; i < results.length; i++){

          var category = {
            categoryName: '',
            assigned:true,
            videos:[]
          }
          if(i == 0){
            category.assigned=false;
          }
          category.categoryName = searches[i];
          category.videos = category.videos.concat(results[i].items);
          this.data.push(category);
        }

      }
    );

    console.log(this.data);
    return this.data;

  }

  getVideo(search){

      var videoDuration:string='short';
      var maxRes:string='4';
      var googleToken:string='AIzaSyDzxGVrr6vlmt-gZtqlkAdWhD4cdXZnwbs';
      var order:string='rating';

      let url="https://www.googleapis.com/youtube/v3/search?part=id,snippet"
        +"&q="+search
        +"&type=video&order="+order
        +"&maxResults="+maxRes
        +"&videoDuration="+videoDuration
        +"&key="+googleToken;

      return this.http.get(url).map(res=>res.json());
  }
}
