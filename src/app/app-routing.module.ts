import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTrainComponent } from './components/Admin/TrainManagement/add-train/add-train.component';
import { TrainManagementComponent } from './components/Admin/train-management/train-management.component';
import { VhomeComponent } from './components/Shared/vhome/vhome.component';
import { TestComponentComponent } from './test-component/test-component.component';

const routes: Routes = [
  {path:"",component:VhomeComponent},
  {path:"Admin",component:TrainManagementComponent},
  {path:"Admin/Train/AddTrain",component:AddTrainComponent},
  {path:"Test",component:TestComponentComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
