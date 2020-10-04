import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

// const routes: Routes = [
//   {
//     path: '',
//     component: HomePage,
//     children: [
//       {
//         path: '/search-places',
//         children: [
//           {
//             path: '',
//             loadChildren: () =>
//               import('../search-places/search-places.module').then(m => m.SearchPlacesPageModule)
//           }
//         ]
//       },
//       {
//         path: 'account',
//         children: [
//           {
//             path: '',
//             loadChildren: () =>
//               import('../account/account.module').then(m => m.AccountPageModule)
//           }
//         ]
//       },
//       {
//         path: 'individual-health',
//         children: [
//           {
//             path: '',
//             loadChildren: () =>
//               import('../individual-health/individual-health.module').then(m => m.IndividualHealthPageModule)
//           }
//         ]
//       },
//       {
//         path: '',
//         redirectTo: 'search-places',
//       },
//       { path: '**', redirectTo: 'search-places' },

//     ]
//   }
// ];

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule { }
