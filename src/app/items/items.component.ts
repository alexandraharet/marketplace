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
  data: Array<any>;
  items: Array<any>;
  visibleItems: Array<any>;
  pageLimit = 5;
  pagesShown = 1;
  limit = 0;
  loading = false;
  pages = 0;
  itemsLoaded = false;
  searchResults = false;

  fetchData() {
    return this.http.request('./assets/items.json');
  }

  displayPage() {
    this.limit = this.pageLimit * this.pagesShown;
    this.visibleItems = this.items.slice(0, this.limit);
    this.loading = false;
  }

  loadNewPage() {
    // this.loading = true;
    // const windowHeight = document.documentElement.clientHeight;
    // const scrollTop = document.documentElement.scrollTop;
    // const docHeight = document.documentElement.scrollHeight;
    // console.log('here, windowHeight + scrollTop === docHeight:' + (windowHeight + scrollTop === docHeight));

    // if (windowHeight + scrollTop === docHeight) {
    // this.endOfPage = true;
    console.log('triggered');
    setTimeout(() => {
      this.loading = false;
      this.pagesShown++;
      this.displayPage();
    }, 1000);
    // };
  }

  constructor( private http: Http ) {}

  ngOnInit() {
    this.fetchData().subscribe((res: Response) => {
      const data = res.json();
      this.items = data.items;
      this.itemsLoaded = true;
      this.displayPage();
    });
  }

  moreItemsToShow() {
    return this.visibleItems.length < this.items.length;
  }

  onClick() {
    if (this.moreItemsToShow()) {
      this.loading = true;
      this.loadNewPage();
    }
  }

  // @HostListener('mousewheel') onScroll() {
  //   if (this.visibleItems.length < this.items.length && !this.loading) {
  //     this.loadNewPage();
  //   }
  // }
}
