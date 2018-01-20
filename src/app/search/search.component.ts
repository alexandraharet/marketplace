import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Http, Response, HttpModule } from '@angular/http';
import { SearchPipe } from './search.pipe';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  // @Output() searchResults: EventEmitter<any> = new EventEmitter();
  searchString: String;
  items: Array<any>;
  results = [];
  @Output() favourites = [];

  fetchData() {
    return this.http.request('./assets/items.json');
  }

  constructor(private http: Http) { }

  toggleFavourites(item, event) {
    if (event.target.classList.contains('isFav')) {
      const index = this.favourites.findIndex(k => item);
      this.favourites.splice(index, 1);
    } else {
      this.favourites.push(item);
    }
    event.target.classList.toggle('isFav');
    event.target.classList.toggle('fa-heart');
    event.target.classList.toggle('fa-heart-o');
  }

  filterItems(string) {
    this.items.filter(item => {
      console.log('called');
      // console.log(item.description.toLowerCase());
      if (item.title.toLowerCase().includes(string) ||
        item.description.toLowerCase().includes(string) ||
        item.price.toLowerCase().includes(string) ||
        item.email.toLowerCase().includes(string)) {
          this.results.push(item);
      }
    });
  }

  ngOnInit() {
    this.fetchData().subscribe((res: Response) => {
      let i = 1;
      const data = res.json();
      this.items = data.items;
      this.items.forEach((el) => {
        el.id = i;
        i++;
      });
    });
  }

  getSearchString(event) {
    if (event.keyCode === 13 || event.type === 'click') {
      this.results = [];
      this.searchString = document.getElementById('search')['value'];
      if (this.searchString) {
        this.filterItems(this.searchString);
      }
    }
  }

}
