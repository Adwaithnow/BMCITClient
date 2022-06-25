import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainServiceService {
  baseUrl = 'https://localhost:5001/api/';
  constructor(private http:HttpClient) { }
  GetAllTrains():Observable<any[]>{
    return this.http.get<[]>(this.baseUrl+'TrainUser/GetAllTrains')
  }
  GetAllStations():Observable<any[]>{
    return this.http.get<[]>(this.baseUrl + 'Station/GetAllStations')
  };
  GetAllRoutes():Observable<any[]>{
    return this.http.get<[]>(this.baseUrl + 'Route/GetAllRoutes')
  }
  AddRoute(Model:any){
    return this.http.post<any>(this.baseUrl+"Train/AddTrain",Model)
  }
}
