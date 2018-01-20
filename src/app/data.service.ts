import { Injectable } from '@angular/core';
import { Http, Response, HttpModule } from '@angular/http';

@Injectable()
export class DataService {
  results = [];

  constructor(private http: Http) { }

  getData() {
    this.http.request('./assets/items.json').subscribe( data => {
      return this.results = data['results'];
    });
  }

}
