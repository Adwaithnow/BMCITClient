import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  form: FormGroup;
  bookings:any[]=[]
  result:any;
  constructor(public fb: FormBuilder) { }
  ngOnInit(): void {
    this.creatForm();
  }
  creatForm() {
    this.form = this.fb.group(
      {
        id: [''],
        train_Id: [],
        trainNo:[],
        trainName:[],
        fromStation:[],
        toStation:[],
        dateOfJourney:[],
        timeOfJourney:[],
        coachName:[],
        coachType:[],
        fare:[],
        PassengersDetails: this.fb.array([this.PassengerForm()])
      }
    );
  }
  get Passenger() {
    return this.form.get("PassengersDetails") as FormArray;
  }
  PassengerForm() {
    return this.fb.group(
      {
        name: ['',Validators.required],
        gender: ['Male',],
        age:[,[Validators.required]],
        seatNo:[]
      }
    );
  }

  AddNewPassenger() {
    this.Passenger.push(this.PassengerForm());
  }

  removeContact(i: Required<number>) {
    this.Passenger.removeAt(i);
  }
  onsave(){
    this.result = this.form.getRawValue();
  }

}
