import {Component, OnInit} from '@angular/core';
import {catchError, debounceTime, distinctUntilChanged, Subject, throwError} from 'rxjs';
import {ImagesService} from '../../services/images.service';

@Component({
    selector: 'app-image-list',
    templateUrl: './image-list.component.html',
    styleUrls: ['./image-list.component.scss']
})
export class ImageListComponent implements OnInit {
    params: any = {};
    data: any;
    searchTextChanged = new Subject<string>();
    subscription: any;

    constructor(public imagesService: ImagesService) {
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
                    this.getData();
                }
            });
    }

    getData(event?: any) {
        if (event?.pageIndex) {
            this.params.offset = event?.pageIndex;
        }
        this.imagesService.getImages(this.params)
            .pipe(catchError(err => {
                return throwError(err);
            }))
            .subscribe((res: any) => {
                this.data = res;
            });
    }

    search(event: any) {
        this.searchTextChanged.next(event.target.value);
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
