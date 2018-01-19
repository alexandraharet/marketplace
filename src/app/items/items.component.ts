import { Component, OnInit, HostListener  } from '@angular/core';
import { Http, Response, HttpModule } from '@angular/http';
import { NgStyle, NgIf } from '@angular/common';
// import { scrollDetect } from 'scroll-detect';

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
  loading = false;

  fetchData() {
    return this.http.request("./assets/items.json");
  }

  displayPage() {
    this.limit = this.pageLimit * this.pagesShown;
    this.visibleItems = this.items.slice(0, this.limit);
  }

  constructor(
    private http: Http ) {}

    ngOnInit() {
      this.fetchData().subscribe((res: Response) => {
        const data = res.json();
        this.items = data.items;
        this.displayPage();
      });
    }

    @HostListener('mousewheel') onHover() {
      // implement fallbacks for other blrowsers:
      console.log('triggered');
    }
  }
