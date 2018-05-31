import { async, ComponentFixture, inject, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CategoriesPage } from './categories';
import { IonicModule, Platform, NavController, LoadingController, AlertController, Alert } from 'ionic-angular/index';
import { VideosByCategoryProvider } from '../../providers/videos-by-category/videos-by-category'
import { VideosByCategoryMock, UserInfoMock, LoadingControllerMock, NavControllerMock, NotificationsProviderMock } from '../../../test/mocks'
import { AlertControllerMock } from 'ionic3-mocks';
import { UserInfoProvider } from '../../providers/user-info/user-info'
import { HttpModule } from '@angular/http';
import { NotificationsProvider } from '../../providers/notifications/notifications';

describe('CategoriesPage', () => {

  let comp: CategoriesPage;
  let fixture: ComponentFixture<CategoriesPage>;
  let alerCtrlMockInstance = AlertControllerMock.instance();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriesPage],
      imports: [
        IonicModule.forRoot(CategoriesPage),
        HttpModule
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
          provide: VideosByCategoryProvider,
          useClass: VideosByCategoryMock
        },
        {
          provide: UserInfoProvider,
          useClass: UserInfoMock
        },
        {
          provide: AlertController,
          useValue: alerCtrlMockInstance
        },
        {
          provide: NotificationsProvider,
          useClass: NotificationsProviderMock
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesPage);
    comp = fixture.componentInstance;
    alerCtrlMockInstance.create.calls.reset();
  });

  it('should create component', () => expect(comp).toBeDefined());

  it('should load the categories array and render each category with at most 4 videos', (done) => {
    expect(comp.categories).toBeUndefined();

    //Wait for LoadingControllerMock Promise
    comp.ionViewDidLoad();
    fixture.whenStable().then(() => {
      fixture.detectChanges();


      //Wait for loading Categories
      fixture.whenStable().then(() => {
        fixture.detectChanges();

        expect(comp.categories).toBeDefined();
        expect(comp.userCategories).toBeUndefined();

        //Wait for loading User Categories
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          //Test Categories and User Categories
          expect(comp.categories).toBeDefined();
          expect(comp.userCategories).toBeDefined();
          expect(comp.categories.length).toBeGreaterThan(0);

          for(let i=0;i<comp.categories.length;i++){
            let category = comp.categories[i];
            let de: DebugElement[] = fixture.debugElement.queryAll(By.css('.card-categories'));

            // Test title and toggle elements
            let titleElement: HTMLElement = de[i].query(By.css('.card-categories-label')).nativeElement;
            let assignedElement: HTMLElement = de[i].query(By.css('ion-toggle')).nativeElement;

            expect(titleElement.textContent).toContain(category.name);
            expect(assignedElement.attributes['ng-reflect-model'].value).toEqual(String(category.assigned));

            // Test if user is subscribed to category
            let subscribedCategories = comp.userCategories.subscribedCategories.find(x => x == category._id);
            expect(((subscribedCategories)&&(category.assigned==true))||((subscribedCategories==undefined)&&(category.assigned==false))).toBeTruthy();

            // Test category video elements
            let videoElements:DebugElement[] = de[i].queryAll(By.css(".card-categories-col"));

            expect(videoElements.length).toEqual(4);
            expect(category.videos.length).toBeGreaterThanOrEqual(4);

            for(let j=0; j<videoElements.length; j++){
              //Test video title and image
              let imageElement:HTMLElement = videoElements[j].query(By.css("ion-card img")).nativeElement;
              let videoTitleElement:HTMLElement = videoElements[j].query(By.css(".ellipsis small")).nativeElement;
              expect(imageElement.attributes['src'].value).toEqual(category.videos[j].snippet.thumbnails.medium.url);
              expect(videoTitleElement.textContent).toEqual(category.videos[j].snippet.title);
            }

            done();

          }

        });
      });
    });
  });

  it('should show a message asking if the user wants to subscribe, when the user clicks in the toggle to subscribe to a category', (done) => {

    let provider = fixture.debugElement.injector.get(AlertController);


    //Wait for LoadingControllerMock Promise
    comp.ionViewDidLoad();
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      //Wait for loading Categories
      fixture.whenStable().then(() => {
        fixture.detectChanges();

        //Wait for loading User Categories
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          let categories = comp.categories;
          let category = categories[0];
          category.assigned = true;
          expect(provider.create).not.toHaveBeenCalled();
          comp.subscribe(category);
          expect(provider.create).toHaveBeenCalled();
          expect(alerCtrlMockInstance.create.calls.mostRecent().args[0].message).toEqual('Do you want to subscribe to "'+category.name+'" category?');
          done();
        });
      });
    });
  });

  it('should show a message asking if the user wants to unsubscribe, when the user clicks in the toggle to unsubscribe to a category', (done) => {

    let provider = fixture.debugElement.injector.get(AlertController);

    //Wait for LoadingControllerMock Promise
    comp.ionViewDidLoad();
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      //Wait for loading Categories
      fixture.whenStable().then(() => {
        fixture.detectChanges();

        //Wait for loading User Categories
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          let categories = comp.categories;
          let category = categories[0];
          category.assigned = false;
          expect(provider.create).not.toHaveBeenCalled();
          comp.subscribe(category);
          expect(provider.create).toHaveBeenCalled();
          expect(alerCtrlMockInstance.create.calls.mostRecent().args[0].message).toEqual('Do you want to unsubscribe to "software development" category?');
          done();
        });
      });
    });
  });

  it('should store the subscribed category into the user information, when the user confirms that he wants to subscribe', (done)=> {

    let provider = fixture.debugElement.injector.get(UserInfoProvider);
    spyOn(provider, 'storeChanges').and.callThrough();
    //Wait for LoadingControllerMock Promise
    comp.ionViewDidLoad();
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      //Wait for loading Categories
      fixture.whenStable().then(() => {
        fixture.detectChanges();

        //Wait for loading User Categories
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          let categories = comp.categories;

          let category = categories[0];
          category.assigned = true;

          //In case the user is already assigned, remove the category before test
          var idx = comp.userCategories.subscribedCategories.indexOf(category._id);
          if (idx != -1) {
            comp.userCategories.subscribedCategories.splice(idx, 1);
          }

          expect(comp.userCategories.subscribedCategories.indexOf(category._id)).toEqual(-1);
          expect(provider.storeChanges).not.toHaveBeenCalled();

          comp.subscribe(category);
          comp.yesHandler(category);

          expect(comp.userCategories.subscribedCategories.indexOf(category._id)).not.toEqual(-1);
          expect(provider.storeChanges).toHaveBeenCalled();

          done();
        });
      });
    });
  });

  it('should remove the subscribed category from the user information, when the user confirms that he wants to unsubscribe', (done)=> {

    let provider = fixture.debugElement.injector.get(UserInfoProvider);
    spyOn(provider, 'storeChanges').and.callThrough();
    //Wait for LoadingControllerMock Promise
    comp.ionViewDidLoad();
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      //Wait for loading Categories
      fixture.whenStable().then(() => {
        fixture.detectChanges();

        //Wait for loading User Categories
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          let categories = comp.categories;

          let category = categories[0];
          category.assigned = false;

          //In case the user is not assigned, add the category before test
          var idx = comp.userCategories.subscribedCategories.indexOf(category._id);
          if (idx == -1) {
            comp.userCategories.subscribedCategories.push(category._id);
          }

          expect(comp.userCategories.subscribedCategories.indexOf(category._id)).not.toEqual(-1);
          expect(provider.storeChanges).not.toHaveBeenCalled();

          comp.subscribe(category);
          comp.yesHandler(category);

          expect(comp.userCategories.subscribedCategories.indexOf(category._id)).toEqual(-1);
          expect(provider.storeChanges).toHaveBeenCalled();

          done();
        });
      });
    });
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

      //Wait for loading Categories
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
  });

  it('should show an error message and a "try again" button, when the page fails to load categories data', (done)=> {
    //Wait for LoadingControllerMock Promise
    let provider = fixture.debugElement.injector.get(VideosByCategoryProvider);
    let debugElement:DebugElement;

    spyOn(provider, 'load').and.returnValue(Promise.resolve(undefined));

    comp.ionViewDidLoad();
    expect(comp.categories).toBeUndefined();
    expect(comp.loadFailed).toBeFalsy();

    //Wait for LoadingControllerMock Promise
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      //The no connection div should be hidden in the begining
      debugElement = fixture.debugElement.query(By.css(".no-server-connection"));

      expect(debugElement).toBeNull();
      expect(provider.load).toHaveBeenCalled();

      //Wait for loading Categories
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(comp.categories).toBeUndefined();
        expect(comp.loadFailed).toBeTruthy();

        debugElement = fixture.debugElement.query(By.css(".no-server-connection"));
        expect(debugElement).not.toEqual(null);

        done();
      });
    });
  });

  it('should open the category page, when the user click in the category', (done)=> {

    spyOn(NavControllerMock.prototype, 'push').and.callThrough();

    //Wait for LoadingControllerMock Promise
    comp.ionViewDidLoad();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      //Wait for loading Categories
      fixture.whenStable().then(() => {
        fixture.detectChanges();

        //Wait for loading User Categories
        fixture.whenStable().then(() => {
          fixture.detectChanges();

          let categories = comp.categories;
          let category = categories[0];

          expect(NavControllerMock.prototype.push).not.toHaveBeenCalled();
          comp.openCategoryPage(category);
          expect(NavControllerMock.prototype.push).toHaveBeenCalled();

          done();
        });
      });
    });
  });

  it('should call refreshCategories function from NotificationProvider when the user subscribes to a category', (done) => {

    let provider = fixture.debugElement.injector.get(NotificationsProvider);
    spyOn(provider, 'refreshCategories').and.callThrough();
    //Wait for LoadingControllerMock Promise
    comp.ionViewDidLoad();
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      //Wait for loading Categories
      fixture.whenStable().then(() => {
        fixture.detectChanges();

        //Wait for loading User Categories
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          let categories = comp.categories;

          let category = categories[0];
          category.assigned = true;

          //In case the user is already assigned, remove the category before test
          var idx = comp.userCategories.subscribedCategories.indexOf(category._id);
          if (idx != -1) {
            comp.userCategories.subscribedCategories.splice(idx, 1);
          }

          expect(comp.userCategories.subscribedCategories.indexOf(category._id)).toEqual(-1);
          expect(provider.refreshCategories).not.toHaveBeenCalled();

          comp.subscribe(category);
          comp.yesHandler(category);

          expect(comp.userCategories.subscribedCategories.indexOf(category._id)).not.toEqual(-1);
          expect(provider.refreshCategories).toHaveBeenCalled();

          done();
        });
      });
    });
  });

  it('should call refreshCategories function from NotificationProvider when the user unsubscribe to a category', (done) => {
    let provider = fixture.debugElement.injector.get(NotificationsProvider);
    spyOn(provider, 'refreshCategories').and.callThrough();
    //Wait for LoadingControllerMock Promise
    comp.ionViewDidLoad();
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      //Wait for loading Categories
      fixture.whenStable().then(() => {
        fixture.detectChanges();

        //Wait for loading User Categories
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          let categories = comp.categories;

          let category = categories[0];
          category.assigned = false;

          //In case the user is not assigned, add the category before test
          var idx = comp.userCategories.subscribedCategories.indexOf(category._id);
          if (idx == -1) {
            comp.userCategories.subscribedCategories.push(category._id);
          }

          expect(comp.userCategories.subscribedCategories.indexOf(category._id)).not.toEqual(-1);
          expect(provider.refreshCategories).not.toHaveBeenCalled();

          comp.subscribe(category);
          comp.yesHandler(category);

          expect(comp.userCategories.subscribedCategories.indexOf(category._id)).toEqual(-1);
          expect(provider.refreshCategories).toHaveBeenCalled();

          done();
        });
      });
    });
  });

});
