import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {ImageListComponent} from './image-list.component';
import {CommonModule} from '@angular/common';
import {ImagesRoutingModule} from '../../images-routing.module';
import {HttpClient, HttpClientModule, HttpHandler} from '@angular/common/http';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ImagesService} from '../../services/images.service';
import {of} from 'rxjs';

describe('ImageListComponent', () => {
    let component: ImageListComponent;
    let service: ImagesService;
    let fixture: ComponentFixture<ImageListComponent>;


    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ImageListComponent],
            imports: [
                CommonModule,
                ImagesRoutingModule,
                HttpClientModule,
                MatGridListModule,
                MatPaginatorModule,
                MatFormFieldModule,
                MatInputModule,
                BrowserAnimationsModule
            ],
            providers: [HttpClient, HttpHandler]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ImageListComponent);
        service = TestBed.inject(ImagesService);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });


    it("unit test subscribe method", fakeAsync(() => {
        let spy = spyOn(service, "getImages").and.returnValue(of([]))
        let subSpy = spyOn(service.getImages(), 'subscribe');
        component.ngOnInit();
        tick();
        expect(spy).toHaveBeenCalledBefore(subSpy);
        expect(subSpy).toHaveBeenCalled();
    }));


    it("unit test inside subscribe method", fakeAsync(() => {
        const fakeData = [
            {id: 1, url: 'src="https://media2.giphy.com/media/1wgWg37SF9FZS6tCCJ/giphy.gif?cid=dc63e32b0ayqk3mzck55o5xvyong1jkhrh9htiuheol78du4&rid=giphy.gif&ct=g"'},
            {id: 2, url: 'https://media2.giphy.com/media/l4FGkYtKhOIZNZTaM/giphy.gif?cid=dc63e32b0ayqk3mzck55o5xvyong1jkhrh9htiuheol78du4&rid=giphy.gif&ct=g'}
        ]
        let spy = spyOn(service, "getImages").and.returnValue(of(fakeData))
        component.ngOnInit();
        tick();
        expect(component.data).toBeDefined();
        expect(component.data.length).toEqual(2);
    }));
});
