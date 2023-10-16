import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Error404Component } from './shared/pages/error404/error404.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardPageComponent } from './dashboard/pages/dashboard-page/dashboard-page.component';
import { MaterialModule } from './material/material.module';
import { MessageSnackBarComponent } from './shared/components/message-snack-bar/message-snack-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    Error404Component,
    DashboardPageComponent,
    MessageSnackBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
