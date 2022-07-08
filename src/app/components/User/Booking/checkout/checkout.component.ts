import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  @Input() Seats: any[];
  @Input() SearchResultsChkout:any[]
  SelectedSeats: any[] = [];
  form: FormGroup;
  bookings: any[] = []
  result: any;
  constructor(public fb: FormBuilder) { }

  ngOnInit(): void {
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
        id: [''],
        train_Id: [],
        trainNo: [],
        trainName: [],
        fromStation: [],
        toStation: [],
        dateOfJourney: [],
        timeOfJourney: [],
        coachName: [],
        coachType: [],
        fare: [],
        PassengersDetails: this.fb.array([])
      }
    );
  }
  get Passenger() {
    return this.form.get("PassengersDetails") as FormArray;
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
  }

}
