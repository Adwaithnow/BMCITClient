import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BookingService } from 'src/app/Service/booking.service';
import { UserAuthService } from 'src/app/Service/user-auth.service';
import { fareDetails } from "src/app/utils/appUtils";
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  @Input() Seats: any[];
  @Input() SelectedCompart:string;
  @Input() coachName:string;
  faredetails:any;
  totalfare:any;
  uid:string;
  timeofjourney:string;
  @Input() SearchResultsChkout:any
  SelectedSeats: any[] = [];
  form: FormGroup;
  bookings: any[] = []
  result: any;
  constructor(public fb: FormBuilder,
    private jwtHelper:JwtHelperService,
    private userAuthService:UserAuthService,
    private book:BookingService
    ) { }

  ngOnInit(): void {
    this.faredetails=fareDetails[this.SelectedCompart]
    this.totalfare=this.calculatetciketfare();
    const token=this.jwtHelper.decodeToken(this.userAuthService.getToken())
    this.uid=token["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
    this.timeofjourney=this.SearchResultsChkout.stations.find((x:any)=>x.stationId==this.SearchResultsChkout.fromStation).timeArrival;
    const userid=token
    this.creatForm();
    // for (let index = 0; index < (this.Seats.length)-1 ; index++) {
    //   this.AddNewPassenger()
    // }
    for (let index = 0; index < this.Seats.length; index++) {
      const element: any[] = this.Seats[index];
      this.SelectedSeats.push((element[0] * 4) + element[1] + 1);
      this.AddNewPassenger((element[0] * 4) + element[1] + 1)
    }
  }
  creatForm() {
    this.form = this.fb.group(
      {
        id: [this.uid],
        train_Id: [this.SearchResultsChkout.train_Id],
        chart_Id:[this.SearchResultsChkout.chart_Id],
        trainNo: [this.SearchResultsChkout.trainNo],
        trainName: [this.SearchResultsChkout.trainName],
        fromStation: [this.SearchResultsChkout.fromStation],
        toStation: [this.SearchResultsChkout.destStation],
        fromStationName:[this.SearchResultsChkout.fromStationAng],
        toStationName:[this.SearchResultsChkout.toStationAng],
        dateOfJourney: [this.SearchResultsChkout.dateofjourney],
        timeOfJourney: [this.timeofjourney],
        coachName: [this.coachName],
        coachType: [this.SelectedCompart],
        noOfPassengers:[this.Seats.length],
        fare: [this.totalfare],
        dateOfBooking:[new Date()],
        stationIds:[this.SearchResultsChkout.availability.stationIds],
        passengerDetails: this.fb.array([])
      }
    );
  }
  get Passenger() {
    return this.form.get("passengerDetails") as FormArray;
  }
  PassengerForm(n:number) {
    return this.fb.group(
      {
        name: ['', Validators.required],
        gender: ['Male',],
        age: [, [Validators.required]],
        seatNo: [n]
      }
    );
  }

  AddNewPassenger(n:number) {
    console.log(n);
    
    this.Passenger.push(this.PassengerForm(n));
  }

  removeContact(i: Required<number>) {
    this.Passenger.removeAt(i);
  }
  onsave() {
    this.result = this.form.getRawValue();
    console.log(this.result);
    this.book.AddBooking(this.result).subscribe({
      next:(res:any)=>{
        console.log("Success");
      },error:(err:any)=>{
        console.log(err);
      }
    },
    )
    
  }
  calculatetciketfare(){
    // const noofpassengers=this.Seats.length
    return this.Seats.length * fareDetails[this.SelectedCompart].cost;   
  }
}
