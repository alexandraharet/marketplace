import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { Http, Response, HttpModule } from '@angular/http';
import { NgStyle, NgIf } from '@angular/common';

import { FavouritesComponent } from './favourites.component';
import { SearchComponent } from '../search/search.component';
import { SearchService } from './../search.service';

describe('FavouritesComponent', () => {
  let component: FavouritesComponent;
  let fixture: ComponentFixture<FavouritesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavouritesComponent, SearchComponent ],
      providers: [SearchService],
      imports: [HttpModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
