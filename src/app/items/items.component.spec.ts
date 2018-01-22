import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { Component, Input, DebugElement } from '@angular/core';
import { NgStyle, NgIf } from '@angular/common';
import { Http, Response, HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { By } from '@angular/platform-browser';

import { ItemsComponent } from './items.component';
import { FavouritesComponent } from '../favourites/favourites.component';
import { SearchComponent } from './../search/search.component';
import { GetDataService } from '../get-data.service';

describe('ItemsComponent', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;
  let mockItems: Array<any>;
  let de: DebugElement;
  let favIcon: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsComponent, FavouritesComponent, SearchComponent ],
      imports: [ HttpModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
        title: 'Test 3',
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

  it('should list only a "pageLimit" number of items when displayItems is called', () => {
    // arrange
    component.availableItems = mockItems;
    component.pageLimit = 2;

    // act
    component.displayItems();

    // assert
    expect(component.visibleItems.length).toBe(component.pageLimit);
  });

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
    const expectedResult = [ mockItems[1], mockItems[2], mockItems[0] ];

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

  // fit('should add the isFav class to an item when icon is clicked and item is not already in favourites', async() => {
  //   // arrange
  //   spyOn(component, 'toggleFavourites');
  //   console.log(favIcon);

  //   // act
  //   favIcon.triggerEventHandler('click', null);
  //   tick();

  //   // assert
  //   expect(component.toggleFavourites).toHaveBeenCalled();
  //   expect(favIcon.classList.contains('isFav')).toBe(true);
  //   console.log(favIcon);
  // });

  // it('should remove the idFav class from an item when icon is clicked and item is already in favourites', fakeAsync(() => {
  //   // arrange
  //   spyOn(component, 'toggleFavourites');
  //   favIcon.classList.add('isFav');
  //   console.log(favIcon);

  //   // act
  //   favIcon.triggerEventHandler('click', null);
  //   favIcon.click();
  //   fixture.whenStable().then(() => {
  //     console.log(favIcon);
  //     // expect(component.toggleFavourites).toHaveBeenCalled();
  //     // expect(favIcon.classList.contains('isFav')).toBe(false);
  //   });

  //   // assert
  // }));

});
