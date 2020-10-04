import { ChooseLocationComponent } from 'src/app/shared-components/choose-location/choose-location.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    ChooseLocationComponent

  ],
  imports: [
    GoogleMapsModule,
    IonicModule,
    CommonModule
  ],
  exports: [
    ChooseLocationComponent
  ]
})
export class SharedComponentsModule { }
