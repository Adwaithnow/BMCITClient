import { Component, ElementRef, Input, OnInit,Output,TemplateRef, ViewChild  } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Station } from 'src/app/Models/Station';
import { StationService } from 'src/app/Service/station.service';
@Component({
  selector: 'app-addstation',
  templateUrl: './addstation.component.html',
  styleUrls: ['./addstation.component.css']
})
export class AddstationComponent implements OnInit {
  @ViewChild('template', { read: TemplateRef }) mytemplate: TemplateRef<any>;
  @Input() model:Station={
    sId: "",
    stationName: "",
    stationShortCode: "",
    stationLocation: []
  }
  

  isUpdateStation:boolean=false;
 
  constructor(private modalService: BsModalService,private stationservice:StationService,) {
    // this.element=element
   }

  ngOnInit(): void {
    console.log(this.model)
    
  }
  modalRef?: BsModalRef; 
  openModal() {
    this.modalRef = this.modalService.show(this.mytemplate,{
      class: 'modal-dialog-centered',  
    });
  }
  onstationsubmit(){
    if(!this.isUpdateStation){
      this.stationservice.AddStation(this.model).subscribe()
    }
    else{
      this.stationservice.UpdateStation(this.model).subscribe()
    }


    window.location.reload()
  }
  close(){
    this.modalRef?.hide()
    console.log("CLosed")
    this.model={
      sId: "",
      stationName: "",
      stationShortCode: "",
      stationLocation: []
    }
    this.isUpdateStation=false
  }
}
