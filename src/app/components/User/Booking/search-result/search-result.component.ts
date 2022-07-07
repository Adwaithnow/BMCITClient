import { Component, Input, OnInit } from '@angular/core';
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
  selectedCompartmentType:string = ''
  searchresult:any[]=[]
  fakeArray = new Array(4);
  constructor(private user:UserServiceService) { }
  weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  CompartmentsForView(item:any){
    return Object.keys(item.availability.compartmentTypes)
  }
  book(comp:any){
    console.log(comp);
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
    this.user.SearchStation(this.Model).subscribe(res=>{
      this.searchresult = res;
      this.reCountAvailability();
      console.log('n', this.searchresult);
    })
  }

  reCountAvailability(): void {
    this.searchresult.forEach(sr => {
      sr.availability = {}
      const stationIds=this.getStationIds(sr.stations)
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
    stations.forEach((s:any) => {
      if(_fstn.distance >= s.distance || _tstn.distance <= s.distance) {
        ids.push(s.stationId)
      }
    })
    return ids
  }
}

        // sr.availability.stations[station.sId] = {}
        //Availability across stations
        // sr.availability.stations[station.sId].compartments =
        //   this.summarizeCompartmentAvailability(station.compartments)
      // })
      //Availability by compartment type