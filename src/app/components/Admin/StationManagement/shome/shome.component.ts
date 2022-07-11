import { Component, OnInit, ViewChild } from '@angular/core';
import { Station } from 'src/app/Models/Station';
import { StationService } from 'src/app/Service/station.service';
import { TrainServiceService } from 'src/app/Service/train-service.service';
import { AddstationComponent } from '../addstation/addstation.component';

@Component({
  selector: 'app-shome',
  templateUrl: './shome.component.html',
  styleUrls: ['./shome.component.css']
})
export class ShomeComponent implements OnInit {
  @ViewChild(AddstationComponent) child!:any
  stations: any[] = [];
  UpdateStationDta:Station={
    sId: "",
    stationName: "",
    stationShortCode: "",
    stationLocation: []
  }
  constructor(private stationservice:StationService,
    private train: TrainServiceService
    ) { }

  ngOnInit(): void {
    this.GetAllStation()
  }
  DeleteStation(id:string){
    this.stationservice.DeleteOneStation(id).subscribe()
    window.location.reload()
  }
  UpdateStation(item:Station){
    this.UpdateStationDta=item;
    this.child.isUpdateStation=!this.child.isUpdateStation;
    this.child.openModal();
    console.log()
   }
   GetAllStation() {
    this.train.GetAllStations().subscribe({ next: (res: any) => this.stations = res })
  }
}
