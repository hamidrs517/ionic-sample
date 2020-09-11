import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoradPage } from './borad.page';

const routes: Routes = [
  {
    path: '',
    component: BoradPage,
  },
  {
    path: '',
    redirectTo: '/dashboard/page4',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: '',
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardPageRoutingModule { }
