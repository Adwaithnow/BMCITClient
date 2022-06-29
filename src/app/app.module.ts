import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/Shared/nav/nav.component';
import { VhomeComponent } from './components/Shared/vhome/vhome.component';
import{HttpClientModule} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrainManagementComponent } from './components/Admin/train-management/train-management.component';
import { AddTrainComponent } from './components/Admin/TrainManagement/add-train/add-train.component';
import { EditTrainComponent } from './components/Admin/TrainManagement/edit-train/edit-train.component';
import { AddRouteComponent } from './components/Admin/RouteManagement/add-route/add-route.component';
import { EditRouteComponent } from './components/Admin/RouteManagement/edit-route/edit-route.component';
import { SearchResultComponent } from './components/User/Booking/search-result/search-result.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TestComponentComponent } from './test-component/test-component.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { AddstationComponent } from './components/Admin/StationManagement/addstation/addstation.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    VhomeComponent,
    TrainManagementComponent,
    AddTrainComponent,
    EditTrainComponent,
    AddRouteComponent,
    EditRouteComponent,
    SearchResultComponent,
    TestComponentComponent,
    AddstationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AutocompleteLibModule,
    // ReactiveFormsModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
