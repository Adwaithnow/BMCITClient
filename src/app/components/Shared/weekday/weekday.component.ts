import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-weekday',
  templateUrl: './weekday.component.html',
  styleUrls: ['./weekday.component.css']
})
export class WeekdayComponent implements OnInit {
  @Input() day:string;
  @Input() highlight:boolean=false;
  constructor() { }

  ngOnInit(): void {
  }

}
