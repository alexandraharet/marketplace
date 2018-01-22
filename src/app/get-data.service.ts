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

    // makeRequest() {
    //     let promise = new Promise((resolve, reject) => {
    //         let apiURL = `${this.apiRoot}?term=${term}&media=music&limit=20`;
    //         this.http.get('./assets/items.json')
    //         .toPromise()
    //         .then(
    //             res => { // Success
    //                 console.log(res.json());
    //                 resolve();
    //             }
    //         );
    //     });
    //     return promise;
    // }

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
                msg => { // Error
                    reject(msg);
                })
            });
            return promise;
            // this.http.request('./assets/items.json')
            // .subscribe((res: Response) => {
            //     this.data = res.json();
            //     //this.loading = false;
            // });
        }
    }
