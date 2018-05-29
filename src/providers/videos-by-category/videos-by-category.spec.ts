import { VideosByCategoryProvider } from './videos-by-category';
import { Http, HttpModule, ResponseOptions, BaseRequestOptions, Response } from '@angular/http';
import { TestBed, inject, async } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';

const data: any = require('../../../test/mock-data/categories-mock.json');

describe('Provider: VideosByCategory', () => {

  console.log(data);
  beforeEach(async(() => {

      TestBed.configureTestingModule({

          declarations: [

          ],

          providers: [
              VideosByCategoryProvider,
              MockBackend,
              BaseRequestOptions,
              {
                  provide: Http,
                  useFactory: (mockBackend, options) => {
                      return new Http(mockBackend, options);
                  },
                  deps: [MockBackend, BaseRequestOptions]
              }
          ],

          imports: [
              HttpModule
          ]

      }).compileComponents();

  }));

  it('should have a non empty array called data',
    inject([VideosByCategoryProvider, MockBackend], (videosByCategoryProvider, mockBackend) => {

      mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
              body: data
          })));
      });

      videosByCategoryProvider.load();

      expect(Array.isArray(videosByCategoryProvider.data)).toBeTruthy();
      expect(videosByCategoryProvider.data.length).toBeGreaterThan(0);
      expect(videosByCategoryProvider.data.length).toEqual(3);

    })
  );

  it('getCategories function should return a non empty array',
    inject([VideosByCategoryProvider, MockBackend], (videosByCategoryProvider, mockBackend) => {
      mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
              body: data
          })));
      });

      videosByCategoryProvider.load();

      let categories = videosByCategoryProvider.getCategories();
      expect(Array.isArray(categories)).toBeTruthy();
      expect(categories.length).toBeGreaterThan(0);
    })
  );

  it('getCategoriesByIDs function should return a non empty array with the corresponding iDs',
    inject([VideosByCategoryProvider, MockBackend], (videosByCategoryProvider, mockBackend) => {
      mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
              body: data
          })));
      });

      videosByCategoryProvider.load();
      let iDs = [];
      iDs.push(videosByCategoryProvider.data[0]._id);
      iDs.push(videosByCategoryProvider.data[2]._id);

      let categories = videosByCategoryProvider.getCategoriesByIDs(iDs);

      expect(Array.isArray(categories)).toBeTruthy();
      expect(categories.length).toEqual(2);
      expect(categories[0]._id).toEqual(videosByCategoryProvider.data[0]._id);
      expect(categories[1]._id).toEqual(videosByCategoryProvider.data[2]._id);
    })
  );
});
