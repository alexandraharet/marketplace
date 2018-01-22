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
        let promise = new Promise((resolve, reject) => {
            this.http.get('./assets/items.json')
            .toPromise()
            .then(
                res => {
                    const data = res.json();
                    this.items = data.items;
                    resolve();
                },
                msg => {
                    console.log(msg);
                    reject(msg);
                })
            });
            return promise;
        }
    }
