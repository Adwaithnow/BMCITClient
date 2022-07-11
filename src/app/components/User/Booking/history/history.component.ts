import { Component, OnInit, ViewChild } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { PassengerDetailsComponent } from 'src/app/components/Shared/passenger-details/passenger-details.component';
import { BookingService } from 'src/app/Service/booking.service';
import { UserAuthService } from 'src/app/Service/user-auth.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  @ViewChild(PassengerDetailsComponent) child!:any
  uid:string;
  upcoming:any[]=[];
  completed:any[]=[];
  cancelled:any[]=[];
  Passngrs:any[];
  constructor(private booking:BookingService,
    private userAuthService:UserAuthService,
    private jwtHelper:JwtHelperService) { }

  ngOnInit(): void {
    const token=this.jwtHelper.decodeToken(this.userAuthService.getToken())
    this.uid=token["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
    this.GetAllUpcomingBookingByUserId(this.uid)
    this.GetAllCompletedBookingByUserId(this.uid)
    this.GetAllCancelledBookingByUserId(this.uid)
  }
  GetAllUpcomingBookingByUserId(Id:string){
    return this.booking.GetAllUpcomingBookingByUserId(Id).subscribe({
      next:(res:any)=>{
        this.upcoming=res
        // console.log(res);
      }
    })
  }
  GetAllCompletedBookingByUserId(Id:string){
    return this.booking.GetAllCompletedBookingByUserId(Id).subscribe({
      next:(res:any)=>{
        this.completed=res
        // console.log(res);
      }
    })
  }
  GetAllCancelledBookingByUserId(Id:string){
    return this.booking.GetAllCancelledBookingByUserId(Id).subscribe(
      {
        next:(res:any)=>{
          this.cancelled=res
          // console.log(res);
        }
      }
    )
  }
  cancel(id:string){
    console.log(id);
    
  }
  passengers(pass:any){
    this.Passngrs=pass;
    this.child.openModal();
  }

}
