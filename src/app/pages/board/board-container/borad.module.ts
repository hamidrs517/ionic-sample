import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BoradPage } from './borad.page';
import { BoardPageRoutingModule } from './borad-routing.module';
import { CanvasWhiteboardModule } from 'ng2-canvas-whiteboard';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    BoardPageRoutingModule,
    CanvasWhiteboardModule
  ],
  declarations: [BoradPage],
  providers: []
})
export class BoardPageModule { }
