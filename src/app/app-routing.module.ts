import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainManagementComponent } from './train-management/train-management.component';
import { VhomeComponent } from './vhome/vhome.component';

const routes: Routes = [
  {path:"",component:VhomeComponent},
  {path:"Admin",component:TrainManagementComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
