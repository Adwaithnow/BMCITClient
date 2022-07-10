import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { Station } from 'src/app/Models/Station';
import { TrainRes } from 'src/app/Models/trainres';
import { RouteService } from 'src/app/Service/route.service';
import { TrainServiceService } from 'src/app/Service/train-service.service';

@Component({
  selector: 'app-route-management',
  templateUrl: './route-management.component.html',
  styleUrls: ['./route-management.component.css']
})
export class RouteManagementComponent implements OnInit {
  form: FormGroup;
  stations:Station[];
  result: any;
  Trains: TrainRes[];
  constructor(public fb: FormBuilder, private train: TrainServiceService,private routeservice:RouteService) { }

  ngOnInit(): void {
    this.creatForm();
    this.train.GetAllTRainWithoutRoute().subscribe(res => this.Trains = res)    
    this.train.GetAllStations().subscribe(res => this.stations = res)
  }
  creatForm() {
    this.form = this.fb.group(
      {
        rId: [''],
        train_Id: [],
        stations: this.fb.array([this.stationForm()])
      }
    );
  }
  get station() {
    return this.form.get("stations") as FormArray;
  }

  stationForm() {
    return this.fb.group(
      {
        stationId: ['',Validators.required],
        platForm: [],
        timeArrival:[],
        timeDeparture:[],
        distance:[],
        haltTime:[],
        day:[]
      }
    );
  }
 
  cars = [
      { id: 1, name: 'Volvo' },
      { id: 2, name: 'Saab', disabled: true },
      { id: 3, name: 'Opel' },
      { id: 4, name: 'Audi' },
  ];

  onSave() {
    console.log(this.form.getRawValue())
    this.result = this.form.getRawValue();
    this.routeservice.AddRoute(this.form.getRawValue()).subscribe()
  }

  addNewstation() {
    this.station.push(this.stationForm());
  }

  removeContact(i: Required<number>) {
    this.station.removeAt(i);
  }
  onSelect(event: TypeaheadMatch): void {
    console.log(event.item.train_Id);
    
    this.form.controls['train_id'].setValue(event.item.train_Id)
  }
  onSelectStation(event: TypeaheadMatch,i:number): void {
    // console.log("Sid",event.item.sId);   
    console.log(((<FormArray>this.form.controls['stations']).at(i)as FormGroup).controls['stationId'].patchValue(event.item.sId));
    
    // this.form.controls['sId'].setValue(event.item.sId)
  }
  get train_id(){
    return this.form.get('train_id')
  }
}
