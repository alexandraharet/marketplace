import { Component, OnInit, EventEmitter, Output, } from '@angular/core';
import { Http, Response, HttpModule } from '@angular/http';
import { SearchPipe } from './search.pipe';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output() searchResults: EventEmitter<any> = new EventEmitter();
  searchString = '';
  // searchResults = false;
  items: Array<any>;
  results: Array<any>;

  fetchData() {
    return this.http.request('./assets/items.json');
  }

  constructor(private http: Http) { }

  ngOnInit() {
    this.results = [];
    this.fetchData().subscribe((res: Response) => {
      const data = res.json();
      this.items = data.items;
    });
  }

  getSearchString(event) {
    if (event.target.value.length) {
      this.searchResults.emit(true);
      this.searchString = event.target.value;
      console.log(this.searchString);
    }
  }

}
