import { Component, OnInit } from '@angular/core';
import { Http, Response, HttpModule } from '@angular/http';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  items: Array<any>;
  visibleItems: Array<any>;
  pageLimit = 5;
  pagesShown = 1;
  limit = 0;

  getData() {
    this.http.request('./assets/items.json')
    .subscribe((res: Response) => {
      const data  = res.json();
      this.items = data.items;
      console.log(this.items);
    });
  }

  displayPage() {
    this.limit = this.pageLimit * this.pagesShown;
    this.visibleItems = this.items.slice(0, this.limit);
  }

  constructor(
    private http: Http ) {}

    ngOnInit() {
      this.getData();
      this.displayPage();
    }

  }
