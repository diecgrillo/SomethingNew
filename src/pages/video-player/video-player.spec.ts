import { async, ComponentFixture, inject, TestBed, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { VideoPlayerPage } from './video-player';
import { IonicModule, Platform, NavController, LoadingController, NavParams } from 'ionic-angular/index';
import { UserInfoMock, LoadingControllerMock, NavControllerMock, NavParamsMock, NotificationsProviderMock } from '../../../test/mocks'
import { UserInfoProvider } from '../../providers/user-info/user-info'
import { NotificationsProvider } from '../../providers/notifications/notifications'
import { YoutubePipe } from '../../pipes/youtube/youtube';

describe('VideoPlayerPage', () => {

  let comp: VideoPlayerPage;
  let fixture: ComponentFixture<VideoPlayerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VideoPlayerPage,
        YoutubePipe
      ],
      imports: [
        IonicModule.forRoot(VideoPlayerPage)
      ],
      providers: [
        {
          provide: NavController,
          useClass: NavControllerMock
        },
        {
          provide: LoadingController,
          useClass: LoadingControllerMock
        },
        {
          provide: UserInfoProvider,
          useClass: UserInfoMock
        },
        {
          provide: NavParams,
          useClass: NavParamsMock
        },
        {
          provide: NotificationsProvider,
          useClass: NotificationsProviderMock
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    spyOn(NavParamsMock.prototype, 'get').and.callThrough();
    fixture = TestBed.createComponent(VideoPlayerPage);
    comp = fixture.componentInstance;
  });

  it('should call "get" function from NavParams to retrieve the "category" and "video" properties, and should set the category and currentVideo global variables', () => {
    expect(NavParamsMock.prototype.get).toHaveBeenCalledWith("category");
    expect(NavParamsMock.prototype.get).toHaveBeenCalledWith("video");
    expect(comp.navParams.get('category')).toEqual(comp.category);
    expect(comp.navParams.get('video')).toEqual(comp.currentVideo);
  });

  it('should render in the screen all videos that belong to this category, except those that the user has already watched or the current video', (done) => {
    expect(comp.userCategories).toBeUndefined();
    comp.ionViewDidLoad();

    //Wait for LoadingControllerMock Promise
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      //Wait for loading User Categories
      fixture.whenStable().then(() => {
        fixture.detectChanges();

        expect(comp.userCategories).toBeDefined();
        expect(comp.userCategories).not.toBeNull();

        let videos:any[] = comp.category.videos;
        let currentVideo:any = comp.currentVideo;
        let userCategories = comp.userCategories;
        let de: DebugElement[] = fixture.debugElement.queryAll(By.css('.video-item'));

        let watchedVideosCount:number = 0;
        let currentVideoCount:number = 0;

        for(let i=0, j=0 ;i<de.length, j<videos.length;j++){
          if(comp.userCategories.watchedVideos.indexOf(videos[j]._id) == -1){
            if(videos[j]._id === currentVideo._id){
              currentVideoCount++;
              continue;
            }
            let imageElement:HTMLElement = de[i].query(By.css('img')).nativeElement;
            let h4Element:HTMLElement = de[i].query(By.css('h4')).nativeElement;
            let pElement:HTMLElement = de[i].query(By.css('p')).nativeElement;

            expect(imageElement.attributes['src'].value).toEqual(videos[j].snippet.thumbnails.default.url);
            expect(h4Element.textContent).toContain(videos[j].snippet.title);
            expect(pElement.textContent).toEqual(videos[j].snippet.description);

            i++;
          } else {
            watchedVideosCount++;
          }
        }

        expect(watchedVideosCount).toBeGreaterThan(0);
        expect(currentVideoCount).toEqual(1);
        expect(watchedVideosCount+de.length+currentVideoCount).toEqual(videos.length);

        done();
      });
    });
  });

  it('the function isWatchedVideo should return true if the user has already '
    + 'watched the video, otherwise false', () => {

    comp.userCategories = {
      subscribedCategories : [],
      watchedVideos : []
    }

    //empty watchedVideos
    expect(comp.isWatchedVideo("5b0a9732b9c44b253834a3d4")).toBeFalsy();

    comp.userCategories.watchedVideos.push("5b0a9732b9c44b253834a3d4");

    //watched video
    expect(comp.isWatchedVideo("5b0a9732b9c44b253834a3d4")).toBeTruthy();

    //not watched video
    expect(comp.isWatchedVideo("aaaaaaaaaaaaaaaaaaaaaaaa")).toBeFalsy();

  });

  it('should show a loading spinner while the page is waiting for the promises to be concluded', (done)=> {

    spyOn(LoadingControllerMock.prototype, 'create').and.callThrough();
    spyOn(LoadingControllerMock.prototype, 'present').and.callThrough();
    spyOn(LoadingControllerMock.prototype, 'dismiss').and.callThrough();

    expect(LoadingControllerMock.prototype.create).not.toHaveBeenCalled();
    expect(LoadingControllerMock.prototype.present).not.toHaveBeenCalled();

    //Wait for LoadingControllerMock Promise
    comp.ionViewDidLoad();

    expect(LoadingControllerMock.prototype.create).toHaveBeenCalled();
    expect(LoadingControllerMock.prototype.present).toHaveBeenCalled();
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(LoadingControllerMock.prototype.dismiss).not.toHaveBeenCalled();
      //Wait for loading User Categories
      fixture.whenStable().then(() => {
        fixture.detectChanges();

        expect(LoadingControllerMock.prototype.dismiss).toHaveBeenCalled();

        done();
      });
    });

  });

  it('should open the video player page, when the user click in some video', (done)=> {

    spyOn(NavControllerMock.prototype, 'push').and.callThrough();

    //Wait for LoadingControllerMock Promise
    comp.ionViewDidLoad();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      //Wait for loading User Categories
      fixture.whenStable().then(() => {
        fixture.detectChanges();

        let videos = comp.category.videos;
        let video = videos[0];

        expect(NavControllerMock.prototype.push).not.toHaveBeenCalled();
        comp.openCategoryPage(video);
        expect(NavControllerMock.prototype.push).toHaveBeenCalled();

        done();
      });
    });
  });

  // TODO
  // it('should add the current video id to the user information and call storeChanges function from UserInfoProvider, when the user watches a video', (done) => {
  //   //Wait for LoadingControllerMock Promise
  //   comp.ionViewDidLoad();
  //   expect(comp.player).toBeUndefined()
  //   setTimeout(function(){
  //     expect(comp.player).toBeDefined();
  //     done();
  //   }, 5000);
  //
  // });

  // it('should call removeVideo function from NotificationProvider, when the user watches a video', () => {
  //   expect(false).toBeTruthy()
  // });
  //
  // it('should play the video automatically if the user opens this page by clicking on the notification', () => {
  //   expect(false).toBeTruthy()
  // });
});
