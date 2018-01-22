import { TestBed, inject } from '@angular/core/testing';
import { Http, Response, HttpModule } from '@angular/http';

import { SearchService } from './search.service';

describe('SearchService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [SearchService]
        });
    });

    beforeEach('SearchService', () => {
        let service: SearchComponent;

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
    });

    it('should be created', inject([SearchService], (service: SearchService) => {
        expect(service).toBeTruthy();
    }));

    it('should return all items from the mock that contain the search term', () => {
        // arrange
        service.items = mockItems;

        // act
        service.filterItems('Test');

        // assert
        expect(service.results).toEqual(mockItems);
    });

    it('should return empty results when none of the mock items contain the search term', () => {
        // arrange
        service.items = mockItems;

        // act
        service.filterItems('non existant string');

        // assert
        expect(service.results.length).toBe(0);
    });

    it('should set the searched flag to true and call filterItems when a click event is registered with a non-empty search string', () => {
        // arrange
        const clickEvent = { type: 'click'};
        service.items = mockItems;
        el['value'] = 'some string';
        const filterItemsSpy = spyOn(service, 'filterItems');

        // act
        service.getSearchString(clickEvent);

        // asses
        expect(service.searched).toBe(true);
        expect(filterItemsSpy).toHaveBeenCalledWith('some string');
    });

    it('should set the searched flag to false and not call filterItems when a click event is registered with an empty search string', () => {
        // arrange
        const clickEvent = { type: 'click' };
        service.items = mockItems;
        el['value'] = '';
        const filterItemsSpy = spyOn(service, 'filterItems');

        // act
        service.getSearchString(clickEvent);

        // asses
        expect(service.searched).toBe(false);
        expect(filterItemsSpy).not.toHaveBeenCalled();
    });
});
