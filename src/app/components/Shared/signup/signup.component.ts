import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from 'src/app/Service/user-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private userService: UserServiceService,

    private router: Router,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
  }
  signup(loginForm: NgForm) {
    this.userService.signup(loginForm.value).subscribe(
   {
    next:   (response: any) => {
    
      this.router.navigate(['/Login']);
      this.toastr.success(response.rData)
    },
    error:(err) => {
      console.log("err",err.error.rData);
      this.toastr.error(err.error.rData)
    }
   }
    );
  }
}
