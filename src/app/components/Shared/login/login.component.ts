import { Component, ElementRef, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UserAuthService } from 'src/app/Service/user-auth.service';
import { UserServiceService } from 'src/app/Service/user-service.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(
    private userService: UserServiceService,
    private userAuthService: UserAuthService,
    private router: Router,
    private jwtHelper:JwtHelperService
  ) { }

  ngOnInit() {
    
  }
  login(loginForm: NgForm) {
    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        console.log("Res",this.jwtHelper.decodeToken(response.rData));
        const user=this.jwtHelper.decodeToken(response.rData);
        const role = user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];  
      
        this.userAuthService.setRoles(role);
        this.userAuthService.setToken(response.rData);

        console.log("role",role);
        
        if (role === 'Admin') {
          this.router.navigate(['/Admin']);
        } else {
          this.router.navigate(['/User/Home']);
        }
      },
      (error) => {
        console.log("err",error);
      }
    );
  }
 

}
