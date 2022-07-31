import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Train } from 'src/app/Models/Train';
import { TrainRes } from 'src/app/Models/trainres';
import { TrainServiceService } from 'src/app/Service/train-service.service';
import { NgSelectComponent } from '@ng-select/ng-select'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-train',
  templateUrl: './edit-train.component.html',
  styleUrls: ['./edit-train.component.css']
})
export class EditTrainComponent implements OnInit {
  DaysRun: any[] = [];
  selectedCars=[1]
  @Output() back = new EventEmitter();
  daysrun = [
    { id: 0, name: 'Sunday' },
    { id: 1, name: 'Monday' },
    { id: 2, name: 'Tuesday' },
    { id: 3, name: 'Wednesday' },
    { id: 4, name: 'Thursday' },
    { id: 5, name: 'Friday' },
    { id: 6, name: 'Saturday' },



];
  model: TrainRes = {
    train_Id: "",
    trainNo: 0,
    trainName: "",
    fromStation: "",
    toStation: "",
    daysRun: []
  };
  data: any = {}
  @Input() IdFromMain: any;
  
  goback() {
    this.back.emit(false);
  }
  allstations: any[] = [];
  traindetails: any = {}
  keyword = 'stationName';
  constructor(private train: TrainServiceService,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.train.GetAllStations().subscribe(res => this.allstations = res);
    this.train.GetOnTrainById(this.IdFromMain).subscribe(res => this.model = res);
    
  }

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
  SelectDestination(item: any) {
    this.model.toStation = item.sId;
    console.log(this.model)
  }
  SelectStart(item: any) {
    this.model.fromStation = item.sId;
  }
  onsubmit() {
    window.location.reload();
  }
  update(){
    this.train.UpdateTrain(this.model).subscribe({next:(res:any)=>{
      this.toastr.success(res.rData);
    }})
    console.log(this.model);
    
  }
}
