import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { Component, Input, DebugElement } from '@angular/core';
import { NgStyle, NgIf } from '@angular/common';
import { Http, Response, HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { By } from '@angular/platform-browser';

import { ItemsComponent } from './items.component';
import { FavouritesComponent } from '../favourites/favourites.component';
import { SearchComponent } from '../search/search.component';
import { GetDataService } from '../get-data.service';
import { SearchService } from '../search.service';

class MockSearchService {
  searched = true;
  results = [];
  items = [];

  getResults() {
    return this.items;
  }
}

describe('ItemsComponent', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;
  let mockItems: Array<any>;
  let de: DebugElement;
  let favIcon: HTMLElement;
  let searchService: MockSearchService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemsComponent, FavouritesComponent, SearchComponent],
      imports: [HttpModule],
      providers: [GetDataService,
        { provide: SearchService, useClass: MockSearchService}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    searchService = TestBed.get(SearchService);
    de = fixture.debugElement.query(By.css('.fa:first-of-type'));
    favIcon = de.nativeElement;
    mockItems = [
      {
        title: 'Test 1',
        description: 'Description a',
        price: '3',
        email: 'a@test.com',
        image: 'image1.png'
      },
      {
        title: 'Test 2',
        description: 'Description x',
        price: '1',
        email: 'z@test.com',
        image: 'image2.png'
      },
      {
        title: 'Test 2',
        description: 'Description 3',
        price: '1',
        email: 'd@test.com',
        image: 'image3.png'
      }
    ];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('displayItems', () => {
    beforeEach(() => {
      component.pageLimit = 0;
      component.pagesShown = 0;
      component.availableItems = [];
    });

    it('should set limit to the value of pageLimit multiplied by pagesShown', () => {
      // arrange
      component.pageLimit = 2;
      component.pagesShown = 8;
      component.limit = 0;

      // act
      component.displayItems();

      // assert
      expect(component.limit).toBe(16);
    });

    it('should list only a "limit" number of items when displayItems is called', () => {
      // arrange
      component.availableItems = mockItems;
      component.limit = 2;

      // act
      component.displayItems();

      // assert
      expect(component.visibleItems.length).toBe(component.pageLimit);
    });

    it('should set loading to false when called', () => {
      // arrange
      component.loading = true;

      // act
      component.displayItems();

      // assert
      expect(component.loading).toBe(false);
    });
  });


  describe('loadNewPage', () => {
    it('should list another "pageLimit" number of items, if avilable, when loadNewPage is called', fakeAsync(() => {
      // arrang
      component.availableItems = mockItems.concat(mockItems); // set 6 available items
      component.pageLimit = 2;
      const expectedValue = component.pageLimit * 2;

      // act
      component.displayItems();
      component.loadNewPage();
      tick(1000);

      // assert
      expect(component.visibleItems.length).toBe(expectedValue);
    }));
  });

  describe('sortBy', () => {
    it('should sort the available items when sortBy is called with prop title and call the displayItems method', () => {
      // arrange
      component.availableItems = mockItems;
      const displayItemsSpy = spyOn(component, 'displayItems');
      const expectedResult = mockItems;

      // act
      component.sortBy('title');

      // assert
      expect(displayItemsSpy).toHaveBeenCalled();
      expect(component.availableItems).toEqual(expectedResult);
    });

    it('should sort the available items when sortBy is called with prop price and call the displayItems method', () => {
      // arrange
      component.availableItems = mockItems;
      const displayItemsSpy = spyOn(component, 'displayItems');
      const expectedResult = [mockItems[1], mockItems[2], mockItems[0]];

      // act
      component.sortBy('price');

      // assert
      expect(displayItemsSpy).toHaveBeenCalled();
      expect(component.availableItems).toEqual(expectedResult);
    });

    it('should sort the available items when sortBy is called with prop email and call the displayItems method', () => {
      // arrange
      component.availableItems = mockItems;
      const displayItemsSpy = spyOn(component, 'displayItems');
      const expectedResult = [mockItems[0], mockItems[2], mockItems[1]];

      // act
      component.sortBy('email');

      // assert
      expect(displayItemsSpy).toHaveBeenCalled();
      expect(component.availableItems).toEqual(expectedResult);
    });

    it('should sort the available items when sortBy is called with prop description and call the displayItems method', () => {
      // arrange
      component.availableItems = mockItems;
      const displayItemsSpy = spyOn(component, 'displayItems');
      const expectedResult = [mockItems[2], mockItems[0], mockItems[1]];

      // act
      component.sortBy('description');

      // assert
      expect(displayItemsSpy).toHaveBeenCalled();
      expect(component.availableItems).toEqual(expectedResult);
    });
  });

  describe('getResults', () => {
    it('should set availableItesm to the result returned by searchService.getResults when invoked', () => {
      // arrange
      component.availableItems = [];
      spyOn(searchService, 'getResults').and.returnValue(mockItems);

      // act
      component.getResults();

      // assert
      expect(component.availableItems).toEqual(mockItems);
    });

    it('should set call displayItems when invoked', () => {
      // arrange
      component.availableItems = [];
      spyOn(component, 'displayItems');

      // act
      component.getResults();

      // assert
      expect(component.displayItems).toHaveBeenCalled();
    });
  });

});
