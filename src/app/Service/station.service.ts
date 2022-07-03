import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Station } from '../Models/Station';

@Injectable({
  providedIn: 'root'
})
export class StationService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http:HttpClient) { }
  
  AddStation(station:Station){
    return this.http.post<Station>(this.baseUrl+"Station/AddStation",station)
  }
  UpdateStation(station:Station){
    return this.http.patch<Station>(this.baseUrl+"Station/UpdateStation",station)
  }
  DeleteOneStation(id:any): Observable <any> {
    return this.http.delete(`${this.baseUrl}Station/DeleteOneStationById/${id}`); 
   }
   GetAllStations():Observable<any[]>{
    return this.http.get<[]>(this.baseUrl + 'Station/GetAllStations')
  };
  
}
