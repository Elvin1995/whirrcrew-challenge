import {TestBed} from '@angular/core/testing';
import {ImagesService, URLs} from './images.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpParams} from '@angular/common/http';

describe('ImagesService', () => {
    let service: ImagesService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [ImagesService]
        });
        service = TestBed.inject(ImagesService);
        httpMock = TestBed.inject(HttpTestingController);
    });


    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return images result', () => {
        const params: any = {
            q: 'elizabeth olsen',
            api_key: '8LUILyUoIzBkh6uks8I6oG8vRNg9Rmz5',
            limit: 9,
            offset: 0
        };
        service.getImages(params).subscribe((result: any) => {
            expect(result).toBeTruthy();
            expect(result.data).toBeTruthy();
            console.log(result.data.length, 'result.data.length');
            expect(result.data.length).toEqual(311);
        });
        let query = new HttpParams();
        Object.keys(params).forEach(key => {
            query = query.set(key, params[key]);
        });
        const req = httpMock.expectOne((URLs.IMAGE_LIST + '?' + query.toString()));
        expect(req.request.method).toBe('GET');
        // req.flush(result);
    });
});
