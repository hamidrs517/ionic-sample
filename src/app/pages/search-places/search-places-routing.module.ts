import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchPlacesPage } from './search-places.page';

const routes: Routes = [
  {
    path: '',
    component: SearchPlacesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchPlacesPageRoutingModule {}
