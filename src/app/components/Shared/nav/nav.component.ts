import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @ViewChild(LoginComponent) child!:any
  constructor() { }

  ngOnInit(): void {
  }
  
  OpenModal(){
    this.child.openModal();
  }
}
