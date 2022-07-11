import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TrainServiceService } from '../../../Service/train-service.service';
import { UserServiceService } from '../../../Service/user-service.service';
@Component({
  selector: 'app-vhome',
  templateUrl: './vhome.component.html',
  styleUrls: ['./vhome.component.css']
})
export class VhomeComponent implements OnInit {
  form: FormGroup;
  allstations: any[] = [];
  Search: any[] = [];
  Model: any = {};
  constructor(private user: UserServiceService,
    private train: TrainServiceService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }
  users: any;
  today:any=new Date();
  searchresult: boolean = false;
  ngOnInit(): void {
    this.creatForm()
    this.GetAllStation();
  }
  GetAllStation() {
    this.train.GetAllStations().subscribe(res => this.allstations = res)
  }
  SearchTrain() {
    this.Model = this.form.getRawValue()
    this.searchresult = !this.searchresult;
  }
  creatForm() {
    this.form = this.fb.group(
      {
        ToStation: [, Validators.required],
        date: [, Validators.required],
        FromStation: [, Validators.required]
      }
    );
    this.form.get("date")!.setValue(formatDate(this.today,'yyyy-MM-dd','en'))
  }
}
