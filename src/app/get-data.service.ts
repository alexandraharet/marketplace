import { Injectable } from '@angular/core';
import { Http, Response,HttpModule } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GetDataService {
    items: Object[];
    loading: boolean;

    constructor(private http: Http) {
        this.items = [];
        this.loading = false;
    }

    makeRequest() {
        const promise = new Promise((resolve, reject) => {
            this.http.get('./assets/items.json')
            .toPromise()
            .then(
                res => {
                    const data = res.json();
                    this.items = data.items;
                    /* addes unique IDs to each item to idenfify between identical objects;
                    this will be used in removing items from Favourites list. */
                    this.items.forEach((item, index) => {
                        item['id'] = index;
                    });
                    resolve();
                },
                msg => {
                    console.log(msg);
                    reject(msg);
                });
            });
            return promise;
        }
    }
