import { Component, OnInit } from '@angular/core';
import { TrainServiceService } from '../Service/train-service.service';
import { UserServiceService } from '../Service/user-service.service';

@Component({
  selector: 'app-vhome',
  templateUrl: './vhome.component.html',
  styleUrls: ['./vhome.component.css']
})
export class VhomeComponent implements OnInit {
  allstations:any[]=[];
  Search:any[]=[];
  Model:any={};
  keyword = 'stationName';
  constructor(private user:UserServiceService,private train:TrainServiceService) { }
  users:any;
  ngOnInit(): void {
    this.GetAllStation();
    
  }
  GetAllStation(){
    this.train.GetAllStations().subscribe(res=>this.allstations=res)
  }
  SearchTrain(){
    this.user.SearchStation(this.Model).subscribe({next:res=>this.Search=res,error:er=>console.log(er)});
    console.log(this.Search)
  }
  selectEvent(item:any) {
    this.Model.FromStation=item.sId;
  }
  SelectDestination(item:any) {
    this.Model.ToStation=item.sId;
  }

  onChangeSearch(val: string) {
 
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  
  onFocused(e:any){
    // do something when input is focused
  }

}
