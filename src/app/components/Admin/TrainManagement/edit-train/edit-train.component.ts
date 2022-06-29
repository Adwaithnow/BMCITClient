import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Train } from 'src/app/Models/Train';
import { TrainRes } from 'src/app/Models/trainres';
import { TrainServiceService } from 'src/app/Service/train-service.service';

@Component({
  selector: 'app-edit-train',
  templateUrl: './edit-train.component.html',
  styleUrls: ['./edit-train.component.css']
})
export class EditTrainComponent implements OnInit {
  DaysRun: any[] = [];
  @Output() back = new EventEmitter();
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
  constructor(private train: TrainServiceService) { }

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
    this.goback();
  }
}
