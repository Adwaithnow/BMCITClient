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
import { SearchResultComponent } from './components/User/Booking/search-result/search-result.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TestComponentComponent } from './test-component/test-component.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { AddstationComponent } from './components/Admin/StationManagement/addstation/addstation.component';
import { TestComponent } from './test/test.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CheckoutComponent } from './components/User/Booking/checkout/checkout.component';
import { HistoryComponent } from './components/User/Booking/history/history.component';
import { BookingComponent } from './components/Admin/booking/booking.component';
import { RouteManagementComponent } from './components/Admin/route-management/route-management.component';
import { UhomeComponent } from './components/User/uhome/uhome.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SeatArrangeMentComponent } from './seat-arrange-ment/seat-arrange-ment.component';
import { SearchstationComponent } from './components/Shared/searchstation/searchstation.component';
import { WeekdayComponent } from './components/Shared/weekday/weekday.component';
import { FeedbackComponent } from './components/Shared/feedback/feedback.component';
import { PassengerDetailsComponent } from './components/Shared/passenger-details/passenger-details.component';
import { LoginComponent } from './components/Shared/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    VhomeComponent,
    TrainManagementComponent,
    AddTrainComponent,
    EditTrainComponent,
    SearchResultComponent,
    TestComponentComponent,
    AddstationComponent,
    TestComponent,
    CheckoutComponent,
    HistoryComponent,
    BookingComponent,
    RouteManagementComponent,
    UhomeComponent,
    SeatArrangeMentComponent,
    SearchstationComponent,
    WeekdayComponent,
    FeedbackComponent,
    PassengerDetailsComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AutocompleteLibModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
    NgSelectModule,
    TabsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
