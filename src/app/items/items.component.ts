import { Component, OnInit, HostListener, Output, Input, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { NgStyle, NgIf } from '@angular/common';
import { GetDataService } from '../get-data.service';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})

export class ItemsComponent implements OnInit {
  @Output() getFavourites = new EventEmitter<Object>();

  itemToRemove: Object;
  data: Array<any>;
  items: Array<any>;
  availableItems: Array<any>;
  visibleItems: Array<any>;
  pageLimit = 5;
  pagesShown = 1;
  limit = 0;
  loading = false;
  pages = 0;
  itemsLoaded = false;
  searchResults = false;
  favourites = [];

  constructor(
    private http: Http,
    public dataService: GetDataService,
    public searchService: SearchService
  ) { }

  displayItems() {
    this.limit = this.pageLimit * this.pagesShown;
    this.visibleItems = this.availableItems.slice(0, this.limit);
    this.loading = false;
  }

  loadNewPage() {
    setTimeout(() => {
      this.loading = false;
      this.pagesShown++;
      this.displayItems();
    }, 1000);
  }

  sortBy(prop) {
    if (prop === 'price') {
      this.availableItems.sort(function (a, b) {
        return a[prop] - b[prop];
      });
    } else {
      this.availableItems.sort(function (a, b) {
        if (a[prop].toLowerCase() < b[prop].toLowerCase()) {
          return -1;
        } else if (a[prop].toLowerCase() > b[prop].toLowerCase()) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    this.displayItems();
  }

  getResults() {
    this.availableItems = this.searchService.getResults();
    this.displayItems();
  }

  hasResults(val) {
    this.searchResults = val;
    return val;
  }

  toggleFavourites(item, event) {
    if (event.target.classList.contains('isFav')) {
      const index = this.favourites.findIndex(k => item);
      this.favourites.splice(index, 1);
    } else {
      this.favourites.push(item);
      this.getFavourites.emit(this.favourites);
    }
    event.target.classList.toggle('isFav');
    event.target.classList.toggle('fa-heart');
    event.target.classList.toggle('fa-heart-o');
  }

  removeFromFavs(item) {
    const index = this.items.indexOf(item);
    const el = document.getElementById('item-' + index).querySelectorAll('i')[0];
    el.classList.toggle('isFav');
    el.classList.toggle('fa-heart');
    el.classList.toggle('fa-heart-o');
  }

  ngOnInit() {
    this.dataService.makeRequest().then(() => {
      this.items = this.dataService.items;

      this.availableItems = this.items;
      this.itemsLoaded = true;
      this.displayItems();
    });
  }

  moreItemsToShow() {
    return this.visibleItems.length < this.availableItems.length;
  }

  onClick() {
    if (this.moreItemsToShow()) {
      this.loading = true;
      this.loadNewPage();
    }
  }
}
