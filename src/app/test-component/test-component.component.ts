import { Component, OnInit ,TemplateRef} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { TrainRes } from '../Models/trainres';
import { TrainServiceService } from '../Service/train-service.service';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css']
})
export class TestComponentComponent implements OnInit {
  modalRef?: BsModalRef;
  fromstation:any={}
  model: TrainRes={
    train_Id: "",
    trainNo: 0,
    trainName: "",
    fromStation: "",
    toStation: "",
    daysRun: []
  };
  keyword = 'stationName';
  DaysRun: any[] = [];
  public fieldArray: Array<any> = [];
  public newAttribute: any = {};
  allstations:any[]=[]
  constructor(private modalService: BsModalService,private train: TrainServiceService) { }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,{
      class: 'modal-dialog-centered',  
    });
  }
  ngOnInit(): void {
    this.train.GetAllStations().subscribe(res => this.allstations = res);
    // this.train.GetOnTrainById(this.IdFromMain).subscribe(res => this.model = res);
  }
  addFieldValue() {
    this.fieldArray.push(this.newAttribute)
    console.log(this.newAttribute)
    this.newAttribute = {};
  }

  deleteFieldValue(index: number) {
    this.fieldArray.splice(index, 1);
  }
  SelectDestination(item: any) {
    this.model.toStation = item.sId;
    console.log(this.model)
  }
  SelectStart(item: any) {
    this.model.fromStation = item.sId;
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
  onsubmit(){
    console.log(this.model)
    this.modalRef?.hide()
  }
  selected: any={};
  onSelect(event: TypeaheadMatch): void {
    this.fromstation = event.item;
    this.model.fromStation = event.item.sId;
    console.log(this.model)
    
    // console.log(this.fromstation)

    // this.mo.value = event.item.value;
    }
    findstationname(Sid:string){
      return this.allstations.find(x=>x.sId=== Sid).stationName;
    }
}
