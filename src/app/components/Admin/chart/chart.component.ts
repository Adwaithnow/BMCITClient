import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrainRes } from 'src/app/Models/trainres';
import { TrainServiceService } from 'src/app/Service/train-service.service';
import { formatDate } from '@angular/common' 
import { ChartService } from 'src/app/Service/chart.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  form: FormGroup;
  today:any=new Date();
  constructor(public fb: FormBuilder, private train: TrainServiceService,
    private chartservice:ChartService,
    private toastr:ToastrService
    ) { }
  Trains: TrainRes[];
  ngOnInit(): void {
    this.creatForm();
    this.train.GetAllTrains().subscribe(res => this.Trains = res)  
  }
  creatForm() {
    this.form = this.fb.group(
      {
        date: [,Validators.required],
        train_Id: [,Validators.required],
      }
    );
    this.form.get("date")!.setValue(formatDate(new Date,'yyyy-MM-dd','en'))
    // this.form.controls.setValue(formatDate(Date,'yyyy-MM-dd','en'));

  }
  get train_id(){
    return this.form.get('train_id')
  }
  submit(){
    this.chartservice.AddChart(this.form.getRawValue()).subscribe({
      next:(res:any)=>{
        this.toastr.success(res.rData)
      }
    })
  }
}
