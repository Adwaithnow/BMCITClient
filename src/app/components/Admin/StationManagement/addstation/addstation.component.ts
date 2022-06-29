import { Component, Input, OnInit,Output,TemplateRef  } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Station } from 'src/app/Models/Station';
@Component({
  selector: 'app-addstation',
  templateUrl: './addstation.component.html',
  styleUrls: ['./addstation.component.css']
})
export class AddstationComponent implements OnInit {
  @Input() title:string='Default';
  @Output() model:Station={
    sId: "",
    stationName: "",
    stationShortCode: "",
    longitude:"",
    latitude:"",
    stationLocation: []
  }
  isUpdateStation:boolean=false;
 
  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }
  modalRef?: BsModalRef; 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,{
      class: 'modal-dialog-centered',  
    });
  }
  onstationsubmit(){
    console.log(this.model);
  }
}
