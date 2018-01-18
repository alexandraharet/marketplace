import { Component, OnInit } from '@angular/core';
import { Http, Response, HttpModule } from '@angular/http';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items: Array<any>;

  getData() {
    this.http.request('./assets/items.json')
    .subscribe((res: Response) => {
      let data  = res.json();
      this.items = data.items;
      console.log(this.items);
    });
  }

  constructor(
    private http: Http ){}

    ngOnInit() {
      this.getData();
    }

  }
