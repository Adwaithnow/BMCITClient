import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/Service/booking.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  Id:string="string";
  constructor(private booking:BookingService) { }

  ngOnInit(): void {
    // this.GetAllUpcomingBookingByUserId(this.Id)
    // this.GetAllCompletedBookingByUserId(this.Id)
    // this.GetAllCancelledBookingByUserId(this.Id)
  }
  GetAllUpcomingBookingByUserId(Id:string){
    return this.booking.GetAllUpcomingBookingByUserId(Id).subscribe()
  }
  GetAllCompletedBookingByUserId(Id:string){
    return this.booking.GetAllCompletedBookingByUserId(Id).subscribe()
  }
  GetAllCancelledBookingByUserId(Id:string){
    return this.booking.GetAllCancelledBookingByUserId(Id).subscribe()
  }

}
