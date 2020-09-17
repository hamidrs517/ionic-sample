import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatabasePageRoutingModule } from './database-routing.module';

import { DatabasePage } from './database.page';
import { SqlLiteService } from 'src/app/services/sql-lite.service';
import { SQLite } from '@ionic-native/sqlite/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatabasePageRoutingModule
  ],
  declarations: [DatabasePage],
  providers: [
    // SqlLiteService, SQLite
  ]

})
export class DatabasePageModule { }
