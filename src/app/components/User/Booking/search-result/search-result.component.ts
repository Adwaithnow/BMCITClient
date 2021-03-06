import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/Service/user-service.service';
import { weekDay } from "src/app/utils/appUtils";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  // @Input() fromStation:string='ef15b875-2e77-4523-8e54-3879b0eb2e1a';
  // @Input() toStation:string='9296c720-4fb1-4b29-8ef7-8385f23e9d5d';
  // @Input() date:string='2022-07-03';
  selectedcompartment:boolean=false;
  @Input() public Model:any={
    fromStation:'',
    toStation:'',
    date:''
  }
  SelectedTrain:any;
  selectedCompartmentType:string = ''
  searchresult:any[]=[]
  fakeArray = new Array(4);
  constructor(private user:UserServiceService,
    private router: Router
    ) { }
  weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  CompartmentsForView(item:any){
    // console.log('itemm', item)
    // console.log('itemm', item.availability.compartmentTypes)
    return Object.keys(item.availability.compartmentTypes)
  }
  book(comp:any,item:any[]){
    this.SelectedTrain=item;
    console.log(item);
    this.selectedCompartmentType = comp
    
    this.selectedcompartment=true
    console.log(this.selectedcompartment);
  }
  ngOnInit(): void {
    let weekday = new Map<number, string>([
        [0, "S"],
        [1, "M"],
        [2, "M"],
        [3, "M"],
        [4, "M"],
        [5, "M"],
        [6, "M"],
    ]);
    this.user.SearchStation(this.Model).subscribe({
      next:(res:any)=>{
        this.searchresult = res.rData;
        console.log(this.searchresult );
        
        this.reCountAvailability();
        console.log('n', this.searchresult);
      },
      error:(err:any)=>{
        console.log("opk");
        
        setTimeout(() => {
          this.router.navigate(['/home'])
        }
        , 10000);
        window.location.reload();
      // this.router.navigateByUrl("/home")      
    }
    })
  }

  reCountAvailability(): void {
    this.searchresult.forEach(sr => {
      sr.availability = {}
      sr.journeyStats = {}
      const tmp = this.getStationIds(sr.stations)
      const stationIds = tmp.ids
      sr.journeyStats.travelDistance = tmp.dist
      sr.availability.stationIds = stationIds
      console.log({ stationIds })
      let compartmentsToCheck: any[] = []
      sr.chartStation.forEach((station:any) => {
        if(!stationIds.includes(station.sId)) return
        compartmentsToCheck.push(...station.compartments)
      })
      sr.availability.compartments = this.summarizeCompartmentAvailability(compartmentsToCheck)
      sr.availability.compartmentTypes = this.summarizeCompartmentTypes(sr.availability.compartments)
    })
  }

  summarizeCompartmentAvailability(compartments:any) {
    const availability: {[key:string]: any} = {}
    compartments.forEach((comp:any)=> {
      if(!availability[comp.name]) {
        availability[comp.name] = {
          type: comp.type,
          name: comp.name,
          seats: comp.seats,
        }
      }
      console.log(availability[comp.name].seats.length);
      for (let i = 0; i < availability[comp.name].seats.length; i++) {
        // compare and update with the greatest
        for (let j= 0; j < availability[comp.name].seats[i].lenglth; j++) {
          if(availability[comp.name].seats[i][j] < comp.seats[i][j]){
            availability[comp.name].seats[i][j] = comp.seats[i][j]
          } 
        }
        // if(comp.seats[i]) ava[comp.name].seats[i] = comp.seats[i]
      }
    })
    for (let k in availability) {
      availability[k]['stats'] = this.summarizeSeatsAvailability(availability[k].seats)
    }
    return availability
  }
  summarizeSeatsAvailability(seats:any) {
    let booked = 0
    let available = 0
    seats.forEach((row:any) => {
      row.forEach((col:any) => {
        switch (col) {
          case 0:
            available++
            break;
          case 1:
            booked++
            break;
        }
      })
    })
    
    return {
      booked,
      available,
      // type: comp.type,
    }
  }

  countCompartmentTypes(comps:any) {
    let coaches: {[key: string]: number} = {};
    for (let comp in comps) {
      const { type } = comps[comp]
      coaches[type] ? coaches[type]++ : coaches[type] = 1
    }
    return coaches
  }

  summarizeCompartmentTypes(compartments:any) {
    let coaches: {[key: string]: any} = {};
    console.log('summarizeCompartmentTypes:', compartments)
    for (let comp in compartments) {
      const { type } = compartments[comp]
      if(!coaches[type]) coaches[type] = { 
        count: 0,
        booked: 0,
        available: 0,
      }
      coaches[type].count++
      coaches[type].booked += compartments[comp].stats.booked
      coaches[type].available += compartments[comp].stats.available
    }
    console.log({ coaches })
    return coaches
  }

  getStationIds(stations:any) {
    let ids:string[] = []
    const _fstn = stations.find((s:any) => s.stationId == this.Model.FromStation)
    const _tstn = stations.find((s:any) => s.stationId == this.Model.ToStation)
    console.log("fromto",_fstn,_tstn)
    const dist = _tstn.distance - _fstn.distance
    stations.forEach((s:any) => {
      if(_fstn.distance <= s.distance && _tstn.distance >= s.distance) {
        console.log({ _fstn, _tstn, s })
        ids.push(s.stationId)
      }
    })
    return {ids, dist}
  }
}

        // sr.availability.stations[station.sId] = {}
        //Availability across stations
        // sr.availability.stations[station.sId].compartments =
        //   this.summarizeCompartmentAvailability(station.compartments)
      // })
      //Availability by compartment type