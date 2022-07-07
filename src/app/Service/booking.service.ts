import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  baseUrl = 'https://localhost:5001/api/';
  constructor(private http:HttpClient) { }
  AddBooking(Booking:any){
    return this.http.post<any[]>(this.baseUrl+"Booking/AddBooking",Booking)
  }
  CancelBookingById(Id:string){
    return this.http.patch<any>(this.baseUrl+"Booking/CancelBookingById",Id)
  }
  GetAllBookingForAdminByTrainId(mode:any){
    return this.http.post<any[]>(this.baseUrl+"Booking/GetAllBookingForAdminByTrainId",mode)
  }
  GetAllUpcomingBookingByUserId(Id:string){
    return this.http.get<any[]>(this.baseUrl+"Booking/GetAllUpcomingBookingByUserId/"+Id)
  }
  GetAllCompletedBookingByUserId(Id:string){
    return this.http.get<any[]>(this.baseUrl+"Booking/GetAllCompletedBookingByUserId/"+Id)
  }
  GetAllCancelledBookingByUserId(Id:string){
    return this.http.get<any[]>(this.baseUrl+"Booking/GetAllCancelledBookingByUserId/"+Id)
  }
}
