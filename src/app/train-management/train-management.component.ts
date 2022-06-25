import { Component, OnInit } from '@angular/core';
import { TrainServiceService } from '../Service/train-service.service';

@Component({
  selector: 'app-train-management',
  templateUrl: './train-management.component.html',
  styleUrls: ['./train-management.component.css']
})
export class TrainManagementComponent implements OnInit {
  trains:any[]=[];
  stations:any[]=[];
  routes:any[]=[];

  constructor(private train:TrainServiceService) { }

  ngOnInit(): void {
    this.GetAllTrains();
  }
  GetAllTrains(){
    this.train.GetAllTrains().subscribe({next:(res:any)=>this.trains=res})
  }
  GetAllRoute(){
    this.train.GetAllRoutes().subscribe({next:(res:any)=>this.routes=res})
  }
  GetAllStation(){
    this.train.GetAllStations().subscribe({next:(res:any)=>this.stations=res})
  }
}
