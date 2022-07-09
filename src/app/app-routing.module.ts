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

const routes: Routes = [
  {path:"",component:VhomeComponent},
  {path:"Admin",component:TrainManagementComponent, canActivate:[AuthGuard], data:{roles:["Admin"]}},
  {path:"Admin/Train/AddTrain",component:AddTrainComponent},
  //Experimentation Module
  {path:"Test",component:TestComponentComponent},
  {path:"test1",component:TestComponent},
  //User Module
  {path:"User/Home",component:UhomeComponent,canActivate:[AuthGuard], data:{roles:["User"]}},
  {path:"User/bookings",component:HistoryComponent},
  {path:"Auth/:signin",component:LoginComponent},
  {path:"Auth/:signup",component:LoginComponent}





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
