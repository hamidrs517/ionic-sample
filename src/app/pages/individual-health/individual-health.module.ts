import { SharedComponentsModule } from './../../shared-components/shared-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IndividualHealthPageRoutingModule } from './individual-health-routing.module';

import { IndividualHealthPage } from './individual-health.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IndividualHealthPageRoutingModule,
    SharedComponentsModule,
  ],
  declarations: [IndividualHealthPage]
})
export class IndividualHealthPageModule {}
