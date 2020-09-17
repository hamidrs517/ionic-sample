import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SensorsPageRoutingModule } from './sensors-routing.module';

import { SensorsPage } from './sensors.page';
import { Sensors } from '@ionic-native/sensors/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SensorsPageRoutingModule
  ],
  declarations: [SensorsPage],
  providers: [Sensors]
})
export class SensorsPageModule { }
