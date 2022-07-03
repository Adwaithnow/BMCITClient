import { Component, OnInit } from '@angular/core';
import { Station } from 'src/app/Models/Station';
import { StationService } from 'src/app/Service/station.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';


@Component({
  selector: 'app-searchstation',
  templateUrl: './searchstation.component.html',
  styleUrls: ['./searchstation.component.css']
})
export class SearchstationComponent implements OnInit {
  Station:Station[];
  lat:number = 22.22;
  lng:number = 22.22;
  mapi:string=`https://maps.google.com/maps?width=100%25&amp;height=100%25&amp;hl=en&amp;q=${this.lat},${this.lng}+(Test)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed`
  map:any;
  
  SelectedStation:Station|undefined;
  constructor(private stationservice:StationService,private sanitizer: DomSanitizer) { }
  sId:string;
  ngOnInit(): void {
    this.map=this.sanitizer.bypassSecurityTrustResourceUrl(this.mapi)
    this.stationservice.GetAllStations().subscribe(res=>this.Station=res)
  }
  searchme(){
    this.SelectedStation=this.Station.find(x=>x.sId===this?.sId)
    console.log(this.SelectedStation?.stationLocation);
    
  }

}
