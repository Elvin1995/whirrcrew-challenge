import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ImagesRoutingModule} from './images-routing.module';
import {ImageListComponent} from './components/image-list/image-list.component';
import {HttpClientModule} from '@angular/common/http';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@NgModule({
    declarations: [
        ImageListComponent
    ],
    imports: [
        CommonModule,
        ImagesRoutingModule,
        HttpClientModule,
        MatGridListModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
    ],
})
export class ImagesModule {
}
