import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, throwError} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'whirrcrew-challenge';
  params = {
    page: 0,
    size: 9
  }
  data = [];
  constructor(private http: HttpClient,) {
  }

  ngOnInit() {
    this.http.get('', {
      params: this.params,
      // withCredentials: true
    })
      .pipe(catchError(err => {
        return throwError(err);
      }))
      .subscribe((res: any)=>{
        this.data = res
      })
  }
}
