import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetPlacePointPage } from './set-place-point.page';

const routes: Routes = [
  {
    path: '',
    component: SetPlacePointPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetPlacePointPageRoutingModule {}
