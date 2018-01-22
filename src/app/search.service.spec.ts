import { DebugElement } from '@angular/core';
import { TestBed, inject, ComponentFixture } from '@angular/core/testing';
import { Http, Response, HttpModule } from '@angular/http';

import { SearchService } from './search.service';

describe('SearchService', () => {

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
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [SearchService]
        });
    });
    
    it('should be created',
    inject([SearchService], (service: SearchService) => {
        expect(service).toBeTruthy();
    }));
    
    it('should return all items from the mock that contain the search term',
    inject([SearchService], (service: SearchService) => {
        // arrange
        service.items = mockItems;
        
        // act
        service.filterItems('Test');
        
        // assert
        expect(service.results).toEqual(mockItems);
    }));
    
    it('should return empty results when none of the mock items contain the search term',
    inject([SearchService], (service: SearchService) => {
        // arrange
        service.items = mockItems;
        
        // act
        service.filterItems('non existant string');
        
        // assert
        expect(service.results.length).toBe(0);
    }));
});
