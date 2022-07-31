import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from 'src/app/Service/user-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  constructor(
    private userService: UserServiceService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.creatForm()
  }
  signup() {
    // console.log(this.form.getRawValue());
    
    this.userService.signup(this.form.getRawValue()).subscribe(
      {
        next: (response: any) => {

          this.router.navigate(['/Login']);
          this.toastr.success(response.rData)
        },
        error: (err) => {
          console.log("err", err.error.rData);
          this.toastr.error(err.error.rData)
        }
      }
    );
  }
  creatForm() {
    this.form = this.fb.group(
      {
        firstName: [, [Validators.required, Validators.minLength(5), Validators.pattern("^[a-zA-Z]+$")]],
        lastName: [, [Validators.required, Validators.minLength(1), Validators.pattern("^[a-zA-Z]+$")]],
        email: [, [Validators.required, Validators.minLength(4)]],
        password: [, [Validators.required, Validators.minLength(4)]]
      }
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
}
