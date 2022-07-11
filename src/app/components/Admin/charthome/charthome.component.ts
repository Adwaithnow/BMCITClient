import { Component, OnInit } from '@angular/core';
import { ChartService } from 'src/app/Service/chart.service';

@Component({
  selector: 'app-charthome',
  templateUrl: './charthome.component.html',
  styleUrls: ['./charthome.component.css']
})
export class CharthomeComponent implements OnInit {
  charts:any[]
  constructor(private chart:ChartService) { }

  ngOnInit(): void {    
    this.chart.GetALlChart().subscribe({
      next:(res:any)=>{
        this.charts=res.rData
      }
    })
  }

}
