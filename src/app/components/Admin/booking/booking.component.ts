import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  booktoggle: boolean = false;
  SearchModel: any = {}
  Passngrs:any[];
  trains:any[]=[]
  // trains: any[] = [];
  constructor(private booking: BookingService, private fb: FormBuilder,private train: TrainServiceService) { }
  bookings: any[] = []
  ngOnInit(): void {
    this.train.GetAllTrains().subscribe({ next: (res: any) => this.trains = res })
    // this.booking.GetAllBookingForAdmin().subscribe(res=>this.bookings=res);
  }
  onsubmit(){
    console.log(this.SearchModel);
    this.booking.GetAllBookingForAdminByTrainId(this.SearchModel).subscribe(res=>this.bookings=res)
  }
  passengers(pass:any){
    this.Passngrs=pass;
    this.child.openModal();
  }
}

