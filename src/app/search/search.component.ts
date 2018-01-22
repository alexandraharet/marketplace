import { Component, EventEmitter, ElementRef, Output, Input } from '@angular/core';
import { Http, Response, HttpModule } from '@angular/http';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Output() getResults = new EventEmitter<Object>();
  @Input() items: Array<any>;
  results = [];
  hasResults: Boolean;

  constructor (
    private http: Http,
    private searchService: SearchService
  ) { }

  search(event, items) {
    this.searchService.getSearchString(event, items);
    this.results = this.searchService.getResults();
    this.searched = this.searchService.getSearchStartus();
    if (this.results.length) {
      this.hasResults = true;
      this.getResults.emit();
    } else {
      this.hasResults = false;
    }
  }
}
