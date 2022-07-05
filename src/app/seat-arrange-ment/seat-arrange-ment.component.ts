import { NumberSymbol } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-seat-arrange-ment',
  templateUrl: './seat-arrange-ment.component.html',
  styleUrls: ['./seat-arrange-ment.component.css']
})
export class SeatArrangeMentComponent implements OnInit {
  @Input() SeatArrangemnt:any=[]
  fakeArray = [
  [1,1,1,1],
  [1,1,1,1],
];
  constructor() { }
  Seat:number[][]= [] 

  ngOnInit(): void {
  }
  additem(row: number,col:number) {
    let inde = this.Seat.findIndex(e => JSON.stringify(e) === JSON.stringify([row, col]))
    
    if(inde==-1||this.Seat.length==0){
      this.Seat.push([row,col])
      console.log("Addanam");
    }
    else{
      this.Seat.splice(inde,1);
      console.log("Kalayanam");
    }  
  }
  // findme(i:number,j:number){
  //   let indu:number=-1;
  //   this.Seat.forEach((value,index)=>
  //   {
  //     if(value[0]===i&&value[1]===j)
  //     {
  //      indu=index  
  //     }
  //   }) 
  //   return indu;
  // }
}
