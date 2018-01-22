import { Injectable } from '@angular/core';
import { Http, Response, HttpModule } from '@angular/http';

@Injectable()
export class SearchService {

  searchString: String;
  results = [];
  searched = false;
  items: Array<any>;

  constructor(private http: Http) { }

  getSearchString(event, items) {
    this.items = items;
    const inputEl = (event.target as Element).closest('.input-group').querySelectorAll('input')[0];
    this.searchString = inputEl.value;
    this.results = [];
    if (!this.searchString) {
      this.searched = false;
    } else {
      this.searched = true;
      this.filterItems(this.searchString);
    }
  }

  filterItems(string) {
    string = string.toLowerCase();
    this.items.filter(item => {
      if (item.title.toLowerCase().includes(string) ||
      item.description.toLowerCase().includes(string) ||
      item.price.toLowerCase().includes(string) ||
      item.email.toLowerCase().includes(string)) {
        this.results.push(item);
      }
    });
  }

  getSearchStatus() {
    return this.searched;
  }

  getResults() {
    if (!this.searched) {
      this.results = this.items;
    }
    return this.results;
  }
}
