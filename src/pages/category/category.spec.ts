import { async, ComponentFixture, inject, TestBed, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CategoryPage } from './category';
import { IonicModule, Platform, NavController, LoadingController, NavParams } from 'ionic-angular/index';
import { UserInfoMock, LoadingControllerMock, NavControllerMock, NavParamsMock } from '../../../test/mocks'
import { UserInfoProvider } from '../../providers/user-info/user-info'

describe('CategoryPage', () => {

  let comp: CategoryPage;
  let fixture: ComponentFixture<CategoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryPage],
      imports: [
        IonicModule.forRoot(CategoryPage)
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
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    spyOn(NavParamsMock.prototype, 'get').and.callThrough();
    fixture = TestBed.createComponent(CategoryPage);
    comp = fixture.componentInstance;
  });

  it('should call "get" function from NavParams to retrieve the "category" property, and should set the category global variable', () => {
    expect(NavParamsMock.prototype.get).toHaveBeenCalledWith("category");
    expect(comp.navParams.get('category')).toEqual(comp.category);
  });

  it('should render in the screen all videos that belong to this category, except those that the user have already watched', (done) => {
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
        let userCategories = comp.userCategories;
        let de: DebugElement[] = fixture.debugElement.queryAll(By.css('.video-item'));

        let watchedVideos:number = 0;

        for(let i=0, j=0 ;i<de.length, j<videos.length;j++){
          if(comp.userCategories.watchedVideos.indexOf(videos[j]._id) == -1){

            let imageElement:HTMLElement = de[i].query(By.css('img')).nativeElement;
            let h4Element:HTMLElement = de[i].query(By.css('h4')).nativeElement;
            let pElement:HTMLElement = de[i].query(By.css('p')).nativeElement;

            expect(imageElement.attributes['src'].value).toEqual(videos[j].snippet.thumbnails.default.url);
            expect(h4Element.textContent).toContain(videos[j].snippet.title);
            expect(pElement.textContent).toEqual(videos[j].snippet.description);

            i++;
          } else {
            watchedVideos++;
          }
        }

        expect(watchedVideos+de.length).toEqual(videos.length);

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

});
