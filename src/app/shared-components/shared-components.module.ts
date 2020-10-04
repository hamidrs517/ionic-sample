import { ChooseLocationComponent } from 'src/app/shared-components/choose-location/choose-location.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { IonicModule } from '@ionic/angular';
import { PlaceHealthDetailsComponent } from './place-health-details/place-health-details.component';



@NgModule({
  declarations: [
    ChooseLocationComponent,
    PlaceHealthDetailsComponent

  ],
  imports: [
    GoogleMapsModule,
    IonicModule,
    CommonModule
  ],
  exports: [
    ChooseLocationComponent,
    PlaceHealthDetailsComponent
  ]
})
export class SharedComponentsModule { }
