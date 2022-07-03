import { Component, ElementRef, OnInit, TemplateRef, ViewChild  } from '@angular/core';
import { Station } from 'src/app/Models/Station';
import { StationService } from 'src/app/Service/station.service';
import { TrainServiceService } from '../../../Service/train-service.service';
import { AddstationComponent } from '../StationManagement/addstation/addstation.component';

@Component({
  selector: 'app-train-management',
  templateUrl: './train-management.component.html',
  styleUrls: ['./train-management.component.css']
})
export class TrainManagementComponent implements OnInit {
  trains: any[] = [];
  @ViewChild(AddstationComponent) child!:any
  isUpdateStation:boolean=false;
  UpdateStationDta:Station={
    sId: "",
    stationName: "",
    stationShortCode: "",
    stationLocation: []
  }
  id: string = '';
  updatetoggle: boolean = false;
  stations: any[] = [];
  routes: any[] = [];
  constructor(private train: TrainServiceService,private stationservice:StationService) { }
  displayedit: boolean = false;
 
  ngOnInit(): void {
    this.GetAllTrains();
  }
  GetAllTrains() {
    this.train.GetAllTrains().subscribe({ next: (res: any) => this.trains = res })
  }
  GetAllRoute() {
    this.train.GetAllRoutes().subscribe({ next: (res: any) => this.routes = res })
  }
  GetAllStation() {
    this.train.GetAllStations().subscribe({ next: (res: any) => this.stations = res })
  }
  public fieldArray: Array<any> = [];
  public newAttribute: any = {};

  addFieldValue() {
    this.fieldArray.push(this.newAttribute)
    console.log(this.newAttribute)
    this.newAttribute = {};
  }

  deleteFieldValue(index: number) {
    this.fieldArray.splice(index, 1);
  }
  refreh(event: boolean) {
    window.location.reload();
  }
  deleteone(id: string) {
    this.train.deleteoneuser(id).subscribe();
    window.location.reload();
  }
  Update(Id: string) {
    // this.train.deleteoneuser(id).subscribe();
    this.id = Id;
    this.updatetoggle = !this.updatetoggle;
    // console.log(id);
    // window.location.reload();
  }
  gobackfromypdate(event: boolean) {
    this.updatetoggle = event;
  }
  test() {
    console.log("hai")
    // var modalToggle = document.getElementById('toggleMyModal') // relatedTarget
  
    // document.ge
  }
  UpdateStation(item:Station){
   this.UpdateStationDta=item;
   this.child.isUpdateStation=!this.child.isUpdateStation;
   this.child.openModal();
   console.log()
  }
  DeleteStation(id:string){
    this.stationservice.DeleteOneStation(id).subscribe()
    window.location.reload()
  }

}
