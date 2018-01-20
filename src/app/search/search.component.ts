import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Http, Response, HttpModule } from '@angular/http';
import { SearchPipe } from './search.pipe';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Output() hasResults = new EventEmitter<Boolean>();
  @Output() getResults = new EventEmitter<Object>();
  @Input() items: Array<any>;
  searchString: String;
  results = [];
  
  constructor(private http: Http) { }
  
  filterItems(string) {
    this.items.filter(item => {
      if (item.title.toLowerCase().includes(string) ||
      item.description.toLowerCase().includes(string) ||
      item.price.toLowerCase().includes(string) ||
      item.email.toLowerCase().includes(string)) {
        this.results.push(item);
      }
    });
    if (this.results.length) {
      this.hasResults.emit(true);
      this.getResults.emit(this.results);
    } else {
      this.hasResults.emit(false);
    }
  }

  getSearchString(event) {
    this.searchString = document.getElementById('search')['value'];

    if (event.keyCode === 13 || event.type === 'click') {
      if (!this.searchString) {
        this.results = [];
        this.getResults.emit(this.items);
      } else {
        this.filterItems(this.searchString);
      }
    }

  }
}
