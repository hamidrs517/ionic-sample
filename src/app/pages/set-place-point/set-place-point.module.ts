import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetPlacePointPageRoutingModule } from './set-place-point-routing.module';

import { SetPlacePointPage } from './set-place-point.page';
import { RatingComponent } from './rating/rating.component';
import { RatingPlusComponent } from './rating-plus/rating-plus.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SetPlacePointPageRoutingModule
  ],
  declarations: [SetPlacePointPage, RatingComponent, RatingPlusComponent]
})
export class SetPlacePointPageModule {}
