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
    IndividualHealthPageRoutingModule
  ],
  declarations: [IndividualHealthPage]
})
export class IndividualHealthPageModule {}
