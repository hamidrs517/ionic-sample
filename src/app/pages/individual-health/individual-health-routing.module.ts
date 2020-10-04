import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndividualHealthPage } from './individual-health.page';

const routes: Routes = [
  {
    path: '',
    component: IndividualHealthPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndividualHealthPageRoutingModule {}
