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
    return Object.keys(item.availability.compartments)
  }
  book(comp:any){
    console.log(comp);
    this.selectedCompartmentType = comp
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
      sr.availability = { stations: {} }
      const stationIds=this.getStationIds(sr.stations)
      console.log({ stationIds })
      sr.chartStation.forEach((chart:any, ci:number) => {
        sr.availability.stations[chart.sId] = {}
        if(!stationIds.includes(chart.sId)) return
        sr.availability.stations[chart.sId].compartments =
          this.summarizeCompartmentAvailability(chart.compartments)
      })
      sr.availability.compartments = this.summarizeCompartmentTypes(sr.availability.stations)
    })
  }

  summarizeCompartmentAvailability(compartments:any) {
    const ava: {[key:string]: any} = {}
    compartments.forEach((comp:any)=> {
      if(!ava[comp.name]) {
        ava[comp.name] = {
          type: comp.type,
          seats: comp.seats,
        }
      }
      for (let i = 0; i < ava[comp.name].seats.length; i++) {
        // compare and update with the greatest
        // if(comp.seats[i]) ava[comp.name].seats[i] = comp.seats[i]
        if(ava[comp.name].seats[i] < comp.seats[i]) ava[comp.name].seats[i] = comp.seats[i]
      }
    })
    for (let k in ava) {
      ava[k]['stats'] = this.summarizeSeatsAvailability(ava[k].seats)
    }
    return ava
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

  summarizeCompartmentTypes(stations:any) {
    let coaches: {[key: string]: any} = {};
    console.log('summarizeCompartmentTypes:', stations)
    const comps = stations[Object.keys(stations)[0]].compartments
    for (let comp in comps) {
      const { type } = comps[comp]
      if(!coaches[type]) coaches[type] = { count: 0 }
      coaches[type].count++
    }
    for (let stn in stations) {
      let _chc: {[key:string]: any} = {}
      for(let co in stations[stn].compartments ){
        for (let ch in coaches) {
          if(!_chc[ch]) _chc[ch] = {
            available: 0,
            booked: 0,
          }
          // if(!_chc[ch]['available']) _chc[ch]['available'] = 0
          // if(!coaches[ch].available) coaches[ch].available = 0
          // console.log({stations, stn, _chc, co, ch})
          // stns -> comps -> |chs|
          if(stations[stn].compartments[co].type == ch) {
            _chc[ch].available += stations[stn].compartments[co].stats.available
            _chc[ch].booked += stations[stn].compartments[co].stats.booked
          }
        }
      }
      for (let ch in coaches) {
        if(!coaches[ch].booked) coaches[ch].booked = _chc[ch].booked
        if(!coaches[ch].available) coaches[ch].available = _chc[ch].available
        if(_chc[ch].booked > coaches[ch].booked) coaches[ch].booked = _chc[ch].booked
        if(_chc[ch].available < coaches[ch].available) coaches[ch].available = _chc[ch].available
      }
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
