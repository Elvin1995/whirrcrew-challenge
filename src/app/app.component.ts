import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, debounceTime, distinctUntilChanged, Subject, throwError} from "rxjs";

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
    searchTextChanged = new Subject<string>();
    subscription: any;

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        this.getData();
        this.subscription = this.searchTextChanged.pipe(
            debounceTime(1000),
            distinctUntilChanged(),
        )
            .subscribe((data: string) => {
                if (data) {
                    this.params.q = data;
                    this.getData()
                }
            });
    }

    getData(event?: any) {
        if (event?.pageIndex) {
            this.params.offset = event?.pageIndex
        }
        console.log(this.params, 'this.params')
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
                this.data = res
            })
    }

    search(event: any) {
        this.searchTextChanged.next(event.target.value);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }
}
