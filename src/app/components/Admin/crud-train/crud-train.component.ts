import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TrainRes } from 'src/app/Models/trainres';
import { StationService } from 'src/app/Service/station.service';
import { TrainServiceService } from 'src/app/Service/train-service.service';

@Component({
  selector: 'app-crud-train',
  templateUrl: './crud-train.component.html',
  styleUrls: ['./crud-train.component.css']
})
export class CrudTrainComponent implements OnInit {
  isUpdateTrain: boolean = false;
  @Input() IdFromMain: string;
  @ViewChild('templates', { read: TemplateRef }) mytemplate: TemplateRef<any>;

  allstations: any[]
  model: TrainRes = {
    train_Id: "",
    trainNo: 0,
    trainName: "",
    fromStation: "",
    toStation: "",
    daysRun: []
  };
  constructor(private modalService: BsModalService, private stationservice: StationService, private train: TrainServiceService) { }

  ngOnInit(): void {

    // this.train.GetOnTrainById(this.IdFromMain).subscribe(res => this.model = res);
    this.stationservice.GetAllStations().subscribe(res => this.allstations = res)
  }
  modalRef?: BsModalRef;
  openModal() {

 
    this.modalRef = this.modalService.show(this.mytemplate, {
      class: 'modal-dialog-centered',
    });
  }
  close() {
    this.modalRef?.hide()
    console.log("CLosed")
    this.model = {
      train_Id: "",
      trainNo: 0,
      trainName: "",
      fromStation: "",
      toStation: "",
      daysRun: []
    }

    this.isUpdateTrain = false
  }

  loadTrain() {
    
    this.train.GetOnTrainById(this.IdFromMain).subscribe(res => this.model = res);
  }
  onstationsubmit() {
    if (!this.isUpdateTrain) {
      // this.stationservice.AddStation(this.model).subscribe()
    }
    else {
      // this.stationservice.UpdateStation(this.model).subscribe()
    }

    window.location.reload()
  }
}
