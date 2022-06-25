import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { VhomeComponent } from './vhome/vhome.component';
import{HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { TrainManagementComponent } from './train-management/train-management.component';
import { AddTrainComponent } from './add-train/add-train.component';




@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    VhomeComponent,
    TrainManagementComponent,
    AddTrainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AutocompleteLibModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
