import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ImageListComponent} from './components/image-list/image-list.component';

const routes: Routes = [
    {
        path: '',
        component: ImageListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ImagesRoutingModule {
}
