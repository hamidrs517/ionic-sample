import { SharedComponentsModule } from './../../shared-components/shared-components.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, ModalController } from '@ionic/angular';

import { AddPlacePageRoutingModule } from './add-place-routing.module';

import { AddPlacePage } from './add-place.page';
import { ChooseLocationComponent } from 'src/app/shared-components/choose-location/choose-location.component';

@NgModule({
  imports: [
    CommonModule,
    GoogleMapsModule,
    FormsModule,
    IonicModule,
    SharedComponentsModule,
    AddPlacePageRoutingModule
  ],
  declarations: [AddPlacePage]
})
export class AddPlacePageModule {

  constructor() {

  }


}
