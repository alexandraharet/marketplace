import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchString: String = '';

  constructor() { }

  ngOnInit() {}

  getSearchString(event) {
    if (event.target.value.length) {
      console.log(event.target.value);
    }
  }

}
