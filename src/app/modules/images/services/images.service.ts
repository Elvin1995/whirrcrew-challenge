import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

export class URLs {
    static readonly IMAGE_LIST: string = 'http://api.giphy.com/v1/gifs/search';
}

@Injectable({
    providedIn: 'root'
})
export class ImagesService {

    constructor(private http: HttpClient) {

    }

    getImages(data?: any) {
        const params = data?.q ? data : {
            q: 'elizabeth olsen',
            api_key: '8LUILyUoIzBkh6uks8I6oG8vRNg9Rmz5',
            limit: 9,
            offset: 0
        };
        let query = new HttpParams();
        Object.keys(params).forEach(key => {
            query = query.set(key, params[key]);
        });
        return this.http.get(URLs.IMAGE_LIST, {
            params: query,
        });
    }
}
