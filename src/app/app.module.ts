import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DaskalosCoreModule } from 'daskalos-core';
import { DaskalosMaterialModule } from 'daskalos-material';
import { DaskalosApiModule } from 'daskalos-api';
import { DaskalosUiModule } from 'daskalos-ui';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DaskalosCoreModule,
    DaskalosMaterialModule,
    DaskalosApiModule,
    DaskalosUiModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
