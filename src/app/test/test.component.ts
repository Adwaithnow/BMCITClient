import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { Station } from '../Models/Station';
import { TrainRes } from '../Models/trainres';
import { RouteService } from '../Service/route.service';
import { StationService } from '../Service/station.service';
import { TrainServiceService } from '../Service/train-service.service';
import { NgSelectComponent } from '@ng-select/ng-select'
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  form: FormGroup;
  stations:Station[];
  result: any;
  Trains: TrainRes[];
  
  constructor(public fb: FormBuilder, private train: TrainServiceService,private routeservice:RouteService) { }


  ngOnInit(): void {
    this.creatForm();
    // this.routeservice.GetOneRouteById("9fed2dfd-6897-408d-ac74-c8e22bb5e66b").subscribe({next:(res)=> {
    //   console.log(res);
    //   for (let index = 0; index <(res.stations.length)-1; index++) {      
    //     this.addNewstation()
    //   }
    //   this.form.patchValue(res)
    // },}); 
    this.train.GetAllTrains().subscribe(res => this.Trains = res)    
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
    // this.routeservice.AddRoute(this.form.getRawValue()).subscribe()
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
