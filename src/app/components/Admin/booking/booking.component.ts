import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from 'src/app/Service/booking.service';
import { TrainServiceService } from 'src/app/Service/train-service.service';
import { PassengerDetailsComponent } from '../../Shared/passenger-details/passenger-details.component';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  @ViewChild(PassengerDetailsComponent) child!:any
  form: FormGroup;
  booktoggle: boolean = false;
  SearchModel: any = {}
  Passngrs:any[];
  trains:any[]=[]
  // trains: any[] = [];
  constructor(private booking: BookingService, 
    private fb: FormBuilder,
    private train: TrainServiceService,
    private toastr:ToastrService
    ) { }
  bookings: any[] = []
  ngOnInit(): void {
    this.creatForm();
    this.train.GetAllTrains().subscribe({ next: (res: any) => this.trains = res })
    // this.booking.GetAllBookingForAdmin().subscribe(res=>this.bookings=res);
  }
  onsubmit(){
    console.log(this.SearchModel);
    this.booking.GetAllBookingForAdminByTrainId(this.form.getRawValue()).subscribe({next:(res:any)=>{this.bookings=res.rData},
  error:(err:any)=>{
    
  }
  })
  }
  passengers(pass:any){
    this.Passngrs=pass;
    this.child.openModal();
  }
  creatForm() {
    this.form = this.fb.group(
      {
        train_Id: [,Validators.required],
        date: [,Validators.required],
      }
    );
    this.form.get("date")!.setValue(formatDate(new Date,'yyyy-MM-dd','en'))
    // this.form.controls.setValue(formatDate(Date,'yyyy-MM-dd','en'));

  }
  
}

