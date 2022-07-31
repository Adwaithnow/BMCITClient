import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Train } from '../Models/Train';
import { TrainRes } from '../Models/trainres';

@Injectable({
  providedIn: 'root'
})
export class TrainServiceService {
  baseUrl = 'https://localhost:5001/api/';
  constructor(private http:HttpClient) { }
  GetAllTrains():Observable<any[]>{
    return this.http.get<[]>(this.baseUrl+'TrainUser/GetAllTrains')
  }
  GetAllTRainWithoutRoute():Observable<any[]>{
    return this.http.get<[]>(this.baseUrl+'Train/GetAllTrainsWithoutRoute')
  }
  GetAllStations():Observable<any[]>{
    return this.http.get<[]>(this.baseUrl + 'Station/GetAllStations')
  };
  GetAllRoutes():Observable<any[]>{
    return this.http.get<[]>(this.baseUrl + 'Route/GetAllRoutes')
  }
  // AddRoute(Model:any){
  //   return this.http.post<any>(this.baseUrl+"Train/AddTrain",Model)
  // }
  //AddTrain
  AddTrain(AddTrain:TrainRes){
    return this.http.post<TrainRes>(this.baseUrl+"Train/AddTrain",AddTrain)
  }
  deleteoneuser(id:any): Observable <any> {
    return this.http.delete(`${this.baseUrl}Train/DeleteOneTrainById/${id}`); 
   }
   GetOnTrainById(id:any): Observable <any> {
    return this.http.get(`${this.baseUrl}Train/GetOneTrainById/${id}`); 
   }
   UpdateTrain(AddTrain:TrainRes){
    return this.http.post<TrainRes>(this.baseUrl+"Train/UpdateTrain",AddTrain)
  }
   
}
