import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EventEmitter, Output, Input } from '@angular/core';
import { Http, Response, HttpModule } from '@angular/http';
import { By } from '@angular/platform-browser';

import { SearchComponent } from './search.component';
import { SearchService } from '../search.service';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

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
      imports: [HttpModule],
      providers: [ SearchService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
