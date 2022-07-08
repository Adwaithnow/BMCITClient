import { Component, ElementRef, Input, OnInit,Output,TemplateRef, ViewChild  } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('template', { read: TemplateRef }) mytemplate: TemplateRef<any>;
  constructor(private modalService: BsModalService) { }

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
  
  }
  onstationsubmit(){
    console.log("daa")


    // window.location.reload()
  }
}
