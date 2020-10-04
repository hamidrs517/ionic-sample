import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'search-places',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../../search-places/search-places.module').then(m => m.SearchPlacesPageModule)
          }
        ]
      },
      // {
      //   path: 'page1',
      //   children: [
      //     {
      //       path: '',
      //       loadChildren: () =>
      //         import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      //     }
      //   ]
      // },
      {
        path: 'individual-health',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../../individual-health/individual-health.module').then(m => m.IndividualHealthPageModule)
          }
        ]
      },
      {
        path: 'gallery-tab',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab3/tab3.module').then(m => m.Tab3PageModule)
          }
        ]
      },

      {
        path: '',
        redirectTo: '/dashboard/search-places',
        pathMatch: 'full'
      }
    ]
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
export class TabsPageRoutingModule { }
