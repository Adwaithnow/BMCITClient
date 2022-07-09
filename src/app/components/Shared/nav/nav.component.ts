import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/Service/user-auth.service';
import { UserServiceService } from 'src/app/Service/user-service.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  
  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    public userService: UserServiceService
  ) { }

  ngOnInit(): void {
  }
  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['']);
  }
}
