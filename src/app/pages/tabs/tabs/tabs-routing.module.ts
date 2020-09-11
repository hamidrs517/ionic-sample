import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'photo-chooser-tab',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab4/tab4.module').then(m => m.Tab4PageModule)
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
        path: 'take-photo',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab2/tab2.module').then(m => m.Tab2PageModule)
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
        redirectTo: '/dashboard/photo-chooser-tab',
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
