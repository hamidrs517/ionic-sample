import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),

  ],
  providers: [
    StatusBar,
    Storage,
    // ToastrService
    // SQLite
    SQLite,
    SQLitePorter,
    BackgroundMode,
    Geolocation,
    LocalNotifications,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
