import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class VideosByCategoryMock {
  jsonData:any=require('./mock-data/categories-mock.json');
  data:any;

  constructor() {
  }

  load():Promise<any>{
    this.data = this.jsonData;
    return Promise.resolve(this.jsonData);
  }

}
@Injectable()
export class UserInfoMock {
  jsonData:any=require('./mock-data/user-info-mock.json');
  data:any;

  constructor(public http: Http) {
  }

  loadFromLocalStorage(){
    this.data = this.jsonData;
    return Promise.resolve(this.jsonData);
  }

  loadFromServer(){

  }

  storeChanges(data:any){}

  getCategories():any{
    this.data = this.jsonData;
    return this.data;
  }
}

export class LoadingControllerMock {

  public create(): any {
    return new LoadingControllerMock;
  }

  public dismiss(): any {}

  public present(): any {
    return Promise.resolve();
  }
}

export class NavControllerMock {

  public push(arg1:any, arg2:any): any {}

}

export class StorageMock {

  userInfo:any=require('./mock-data/user-info-mock.json');

  public get(key:any):Promise<any> {
    return Promise.resolve(this.userInfo);
  }

  public set(key:any, value:any):Promise<any> {
    return Promise.resolve();
  }

}
