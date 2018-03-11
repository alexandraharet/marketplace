import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EventEmitter, Output, Input } from '@angular/core';
import { Http, Response, HttpModule } from '@angular/http';
import { By } from '@angular/platform-browser';

import { SearchComponent } from './search.component';
import { SearchService } from '../search.service';

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

class MockSearchService {
  searched = true;
  items = mockItems;
  results = [];
  getSearchString(event, items) {
    return true;
  }

  getResults() {
    return this.items;
  }

  getSearchStatus() {
    return this.searched;
  }
}

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let searchService: MockSearchService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [HttpModule],
      providers: [ { provide: SearchService, useClass: MockSearchService} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    searchService = TestBed.get(SearchService);
    component.results = [];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fdescribe('search', () => {
    beforeEach(() => {
      const event = 'mockEvent';
    });

    it('should call the getSearchString on the searchService when invoked', () => {
      // Arrange
      spyOn(searchService, 'getSearchString').and.callThrough();
      component.items = mockItems;

      // Act
      component.search(event);

      // Assert
      expect(searchService.getSearchString).toHaveBeenCalledWith(event, mockItems);
    });

    it('should set the results to the value returned by getResults on the searchService when invoked', () => {
      // Arrange
      spyOn(searchService, 'getResults').and.callThrough();

      // Act
      component.search(event);

      // Assert
      expect(component.results).toEqual(mockItems);
    });

    it('should set searched to the value returned by getSearchStatus on the searchService when invoked', () => {
      // Arrange
      searchService.searched = false;
      spyOn(searchService, 'getSearchStatus').and.callThrough();

      // Act
      component.search(event);

      // Assert
      expect(component.searched).toBe(false);
    });

    it('should set hasResults to true when results are returned', () => {
      // Arrange
      spyOn(searchService, 'getResults').and.returnValue(mockItems);

      // Act
      component.search(event);

      // Assert
      expect(component.hasResults).toBe(true);
    });

    it('should set hasResults to false when no results are returned', () => {
      // Arrange
      spyOn(searchService, 'getResults').and.returnValue([]);

      // Act
      component.search(event);

      // Assert
      expect(component.hasResults).toBe(false);
    });
  });
});
