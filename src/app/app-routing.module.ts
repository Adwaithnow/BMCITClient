import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTrainComponent } from './components/Admin/TrainManagement/add-train/add-train.component';
import { TrainManagementComponent } from './components/Admin/train-management/train-management.component';
import { VhomeComponent } from './components/Shared/vhome/vhome.component';
import { TestComponentComponent } from './test-component/test-component.component';
import { TestComponent } from './test/test.component';
import { UhomeComponent } from './components/User/uhome/uhome.component';
import { BookingComponent } from './components/Admin/booking/booking.component';
import { HistoryComponent } from './components/User/Booking/history/history.component';
import { AuthGuard } from './Auth/auth.guard';
import { LoginComponent } from './components/Shared/login/login.component';
import { SignupComponent } from './components/Shared/signup/signup.component';
import { SearchstationComponent } from './components/Shared/searchstation/searchstation.component';
import { ShomeComponent } from './components/Admin/StationManagement/shome/shome.component';
import { ChartComponent } from './components/Admin/chart/chart.component';
import { CharthomeComponent } from './components/Admin/charthome/charthome.component';

const routes: Routes = [
  {path:'',component:VhomeComponent},
  {path:"home",component:VhomeComponent},
  {path:"Admin",component:TrainManagementComponent, canActivate:[AuthGuard], data:{roles:["Admin"]}},
  {path:"Admin/Train/AddTrain",component:AddTrainComponent},
  {path:"Admin/Station",component:ShomeComponent},
  {path:"Admin/Booking",component:BookingComponent},
  {path:"Admin/Chart",component:CharthomeComponent},
  {path:"Admin/Chart/Add",component:ChartComponent},


  //Experimentation Module
  {path:"Test",component:TestComponentComponent},
  {path:"test1",component:TestComponent},
  //User Module
  {path:"User/Home",component:UhomeComponent,canActivate:[AuthGuard], data:{roles:["User"]}},
  {path:"User/bookings",component:HistoryComponent,data:{roles:["User"]}},
  {path:"Login",component:LoginComponent},
  {path:"Signup",component:SignupComponent},
  {path:"SearchStation",component:SearchstationComponent},









];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
