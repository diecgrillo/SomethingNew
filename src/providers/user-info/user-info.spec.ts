import { UserInfoProvider } from './user-info';
import { TestBed, inject, async } from '@angular/core/testing';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { StorageMock } from '../../../test/mocks'

const data: any = require('../../../test/mock-data/user-info-mock.json');

describe('Provider: UserInfo', () => {

  console.log(data);
  beforeEach(async(() => {

      TestBed.configureTestingModule({

          declarations: [

          ],

          providers: [
              UserInfoProvider,
              {
                provide: Storage,
                useClass: StorageMock
              }
          ],

          imports: [
              IonicStorageModule.forRoot()
          ]

      }).compileComponents();

  }));

  it('loadFromLocalStorage function should return user data when there is data stored in the local storage', (done) => {
    inject([UserInfoProvider], (userInfoProvider) => {

      spyOn(StorageMock.prototype, 'get').and.callThrough();
      expect(StorageMock.prototype.get).not.toHaveBeenCalled();
      userInfoProvider.loadFromLocalStorage().then((data)=>{
          expect(data).not.toBeNull();
          expect(data).not.toBeUndefined();
          expect(Array.isArray(data.subscribedCategories)).toBeTruthy();
          expect(Array.isArray(data.watchedVideos)).toBeTruthy();
          expect(data.subscribedCategories.length).toBeGreaterThan(0);
          expect(data.watchedVideos.length).toBeGreaterThan(0);
          expect(StorageMock.prototype.get).toHaveBeenCalled();
          done();
      })


    })();


  });
  it('loadFromLocalStorage function should return an empty user info object when there is no user data stored in the local storage', (done) => {
    inject([UserInfoProvider], (userInfoProvider) => {

      spyOn(StorageMock.prototype, 'get').and.returnValue(Promise.resolve(null));
      expect(StorageMock.prototype.get).not.toHaveBeenCalled();
      userInfoProvider.loadFromLocalStorage().then((data)=>{
          expect(data).not.toBeNull();
          expect(data).not.toBeUndefined();
          expect(Array.isArray(data.subscribedCategories)).toBeTruthy();
          expect(Array.isArray(data.watchedVideos)).toBeTruthy();
          expect(data.subscribedCategories.length).toEqual(0);
          expect(data.watchedVideos.length).toEqual(0);
          expect(StorageMock.prototype.get).toHaveBeenCalled();
          done();
      })


    })();
  });
  it('storeChanges function should call storage.set function with the user data as parameter', (done) => {
    inject([UserInfoProvider], (userInfoProvider) => {

      spyOn(StorageMock.prototype, 'set').and.callThrough();
      expect(StorageMock.prototype.set).not.toHaveBeenCalled();
      userInfoProvider.loadFromLocalStorage().then((data)=>{
        userInfoProvider.storeChanges(data).then(()=>{
            expect(StorageMock.prototype.set).toHaveBeenCalledWith("USER_INFO_KEY", data);
            done();
        });
      });
    })();
  });


});
