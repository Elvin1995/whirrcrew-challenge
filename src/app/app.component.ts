import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, throwError} from "rxjs";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'whirrcrew-challenge';
    params: any = {
        q: "ryan gosling",
        api_key: "8LUILyUoIzBkh6uks8I6oG8vRNg9Rmz5",
        limit: 9,
        offset: 0
    };
    data: any;

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        this.getData();
    }

    getData() {
        const url = "http://api.giphy.com/v1/gifs/search"
        let query = new HttpParams();
        Object.keys(this.params).forEach(key => {
            query = query.set(key, this.params[key]);
        })
        this.http.get(url, {
            params: query,
        })
            .pipe(catchError(err => {
                return throwError(err);
            }))
            .subscribe((res: any) => {
                this.data = res?.data
            })
    }
}
