import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeoLocationPageRoutingModule } from './geo-location-routing.module';

import { GeoLocationPage } from './geo-location.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeoLocationPageRoutingModule
  ],
  declarations: [GeoLocationPage],
  providers: [

  ]
})
export class GeoLocationPageModule { }
