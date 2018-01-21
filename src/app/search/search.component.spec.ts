import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EventEmitter, Output, Input, DebugElement } from '@angular/core';
import { Http, Response, HttpModule } from '@angular/http';
import { By } from '@angular/platform-browser';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  const mockItems = [
    {
      title: 'Test 1',
      description: 'Description 1',
      price: '100',
      email: 'email1@test.com',
      image: 'image1.png'
    },
    {
      title: 'Test 2',
      description: 'Description 2',
      price: '200',
      email: 'email2@test.com',
      image: 'image2.png'
    }
  ];
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent],
      imports: [HttpModule]
    })
    .compileComponents();
  }));
  
  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('input#search'));
    el = de.nativeElement;
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should return all items from the mock that contain the search term', () => {
    // arrange
    component.items = mockItems;
    
    // act
    component.filterItems('Test');
    
    // assert
    expect(component.results).toEqual(mockItems);
  });
  
  it('should return empty results when none of the mock items contain the search term', () => {
    // arrange
    component.items = mockItems;
    
    // act
    component.filterItems('non existant string');
    
    // assert
    expect(component.results.length).toBe(0);
  });
  
  it('should set the searched flag to true and call filterItems when a click event is registered with a non-empty search string', () => {
    // arrange
    const clickEvent = { type: 'click'};
    component.items = mockItems;
    el['value'] = 'some string';
    const filterItemsSpy = spyOn(component, 'filterItems');
    
    // act
    component.getSearchString(clickEvent);
    
    // asses
    expect(component.searched).toBe(true);
    expect(filterItemsSpy).toHaveBeenCalledWith('some string');
  });
  
  it('should set the searched flag to false and not call filterItems when a click event is registered with an empty search string', () => {
    // arrange
    const clickEvent = { type: 'click' };
    component.items = mockItems;
    el['value'] = '';
    const filterItemsSpy = spyOn(component, 'filterItems');
    
    // act
    component.getSearchString(clickEvent);
    
    // asses
    expect(component.searched).toBe(false);
    expect(filterItemsSpy).not.toHaveBeenCalled();
  });
});
