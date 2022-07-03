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
  @Input() Model:any={
    fromStation:'',
    toStation:'',
    date:''
  }
  searchresult:any[]=[]
  fakeArray = new Array(4);
  constructor(private user:UserServiceService) { }
  weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

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
      this.calculateAvailability();
      console.log('n', this.searchresult);
      console.log('n', this.searchresult[0].availability);
      this.printCoachTypes()
    })
  }

  printCoachTypes() {
    this.searchresult.forEach((sr:any) => {
      sr.availability.forEach((chart:any) => {
        // this.calculateCompartmentTypes2(chart)
        let g = this.calculateCompartmentTypes(chart)
        console.log(`chart ofsleeper has:`, g['ac'], g.sleeper)
      })
    })
  }

  calculateCompartmentTypes(chart:any):any {
    let coaches: {[key: string]: number} = {};
    chart.forEach((comp:any) => {
      coaches[comp.type] ? coaches[comp.type]++ : coaches[comp.type] = 1
    })
    return coaches
  }

  // calculateCompartmentTypes(chart:any): Map<String, number> {
  //   let coaches = new Map<String, number>();
  //   chart.forEach((comp:any) => {
  //     if(!coaches.has(comp.type)) coaches.set(comp.type, 1)
  //     else coaches.set(comp.type, coaches.get(comp.type)!+1)
  //   })
  //   // console.log({coaches}, sr.availability.length)
  //   return coaches
  // }

  calculateAvailability(): void {

    // for(let i = 0; i < this.searchresult.length; i++) {
    //   this.searchresult[i].availability = {}
    //   let stationIds = this.searchresult[i].stations.map((s:any) => s.stationId)
    //   for(let j = 0; j < this.searchresult[i].chartStation.length; j++) {
    //     if(!stationIds.includes(this.searchresult[i].chartStation[j].sId)) continue
    //     for(let k = 0; k < this.searchresult[i].chartStation[j].compartments.length; k++) {
    //       let c = this.searchresult[i].chartStation[j].compartments[k]
    //       console.log(c, i, j, k, this.searchresult[i].availability[c.type])
    //       if(this.searchresult[i].availability[c.type]) {
    //         console.log('ifff')
    //         this.searchresult[i].availability[c.type]++
    //       } else {
    //         console.log('elss');
    //         this.searchresult[i].availability[c.type] = 1
    //       }
    //       console.log(c, i, j, k, this.searchresult[i].availability[c.type])
    //     }
    //   }
    // }
    
    this.searchresult.forEach(sr => {
      sr.availability = []
      let stationIds = sr.stations.map((s:any) => s.stationId)
      sr.chartStation.forEach((chart:any, ci:number) => {
        sr.availability.push([])
        if(!stationIds.includes(chart.sId)) return
        chart.compartments.forEach((c:any, i:number) => {
          sr.availability[ci][i] = this.summarizeAvailability(c)
        })
      })
    })
  }

  summarizeAvailability(comp:any) {
    let booked = 0
    let available = 0
    comp.seats.forEach((row:any) => {
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
      type: comp.type,
    }
  }

}
