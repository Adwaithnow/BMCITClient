import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-passenger-details',
  templateUrl: './passenger-details.component.html',
  styleUrls: ['./passenger-details.component.css']
})
export class PassengerDetailsComponent implements OnInit {
  @ViewChild('template', { read: TemplateRef }) mytemplate: TemplateRef<any>;
  constructor(private modalService: BsModalService,) { }
  @Input() PassengersDetailsFromParent:any[];
  ngOnInit(): void {
  }
  modalRef?: BsModalRef;
  openModal() {
    this.modalRef = this.modalService.show(this.mytemplate,{
      class: 'modal-dialog-centered',  
    });
  }
  close(){
    this.modalRef?.hide()
    console.log("CLosed")

    // this.isUpdateStation=false
  }

}
