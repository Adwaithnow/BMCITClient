import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TrainServiceService } from '../../../../Service/train-service.service';
import { Train } from '../../../../Models/Train';
import { TrainRes } from 'src/app/Models/trainres';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-train',
  templateUrl: './add-train.component.html',
  styleUrls: ['./add-train.component.css']
})
export class AddTrainComponent implements OnInit {
  // @Output() refreshme = new EventEmitter();
  // @Input () mgsTitle:string='This is my msg';
  // @Input () Id:string|null=null;
  model: TrainRes={
    train_Id: "",
    trainNo: 0,
    trainName: "",
    fromStation: "",
    toStation: "",
    daysRun: []
  };
  allstations: any[] = [];
  DaysRun: any[] = [];
  keyword = 'stationName';
  constructor(private train: TrainServiceService,
    private toastr:ToastrService) { }
  additem(id: number) {
    if (this.DaysRun.indexOf(id) > -1) {
      for (var i = 0; i < this.DaysRun.length; i++) {
        if (this.DaysRun[i] === 5) {
          this.DaysRun.splice(i, 1);
        }
      }
    }
    else {
      this.DaysRun.push(id);
    }
  }
  ngOnInit(): void {
   this.GetAllStation();
  }
  onsubmit() {
    this.model.daysRun=this.DaysRun
    this.train.AddTrain(this.model).subscribe({next:(data:any)=>{
      this.toastr.success(data.rData)
      window.location.reload()
    }});

    document.getElementById('close')?.click(); 
    // this.refreshme.emit(true);
  }
  GetAllStation() {
    this.train.GetAllStations().subscribe(res => this.allstations = res)
  }
  SelectDestination(item: any) {
    this.model.toStation = item.sId;
  }
  SelectStart(item: any) {
    this.model.fromStation = item.sId;
  }
  refresh(){
    setInterval(() => {         
      //replaced function() by ()=>
      this.GetAllStation();
      // just testing if it is working
    }, 1000);
  }
 
}
