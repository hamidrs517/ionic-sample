import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPlacesPageRoutingModule } from './search-places-routing.module';

import { SearchPlacesPage } from './search-places.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPlacesPageRoutingModule
  ],
  declarations: [SearchPlacesPage]
})
export class SearchPlacesPageModule {}
