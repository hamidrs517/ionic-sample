import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'add-place',
    loadChildren: () => import('./pages/add-place/add-place.module').then(m => m.AddPlacePageModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/tabs/tabs/tabs.module').then(m => m.TabsPageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'board',
    loadChildren: () => import('./pages/board/board-container/borad.module').then(m => m.BoardPageModule),
  },
  {
    path: 'refresher',
    loadChildren: () => import('./pages/refresher/refresher.module').then(m => m.RefresherPageModule)
  },
  {
    path: 'network',
    loadChildren: () => import('./pages/network/network.module').then(m => m.NetworkPageModule)
  },
  {
    path: 'platform',
    loadChildren: () => import('./pages/platform/platform.module').then(m => m.PlatformPageModule)
  },
  {
    path: 'file-system',
    loadChildren: () => import('./pages/file-system/file-system.module').then(m => m.FileSystemPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/auth/signup/signup.module').then(m => m.SignUpModule),
  },
  {
    path: 'upload',
    loadChildren: () => import('./pages/upload/upload.module').then(m => m.UploadPageModule)
  },
  {
    path: 'database',
    loadChildren: () => import('./pages/database/database.module').then(m => m.DatabasePageModule)
  },
  {
    path: 'song',
    loadChildren: () => import('./pages/song/song-list/song-list.page.module').then(m => m.SongListPageModule)
  },
  {
    path: 'song/:id',
    loadChildren: () => import('./pages/song/song/song.module').then(m => m.SongPageModule)
  },
  {
    path: 'sensors',
    loadChildren: () => import('./pages/sensors/sensors.module').then(m => m.SensorsPageModule)
  },
  {
    path: 'geo-location',
    loadChildren: () => import('./pages/geo-location/geo-location.module').then(m => m.GeoLocationPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then(m => m.AccountPageModule)
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'add-place',
    loadChildren: () => import('./pages/add-place/add-place.module').then(m => m.AddPlacePageModule)
  },







  // {
  //   path: '404',
  //   component: NotFoundComponent
  // },
  // {
  //   path: '**',
  //   redirectTo: '404'
  // }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
