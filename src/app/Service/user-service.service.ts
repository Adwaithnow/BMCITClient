import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  baseUrl = 'https://localhost:5001/api/';
  constructor(private http :HttpClient) { }
  // GetAllUsers():Observable<any>{
  //   return this.http.get<[]>(this.baseUrl + 'Accounts/GetAllUsers')
  // }
//  GetAllStations():Observable<any[]>{
//     return this.http.get<[]>(this.baseUrl + 'Station/GetAllStations')
//   }
  // SearchStation(Model:any):Observable<any[]>{
  //   return this.http.post<any[]>(this.baseUrl + 'TrainUser/SearchTrain',Model)
  // }
  SearchStation(Model:any):Observable<any[]>{
    console.log('tres',Model)
    Model.FromStation='ef15b875-2e77-4523-8e54-3879b0eb2e1a';
    Model.ToStation='9296c720-4fb1-4b29-8ef7-8385f23e9d5d';
    Model.date='2022-07-04';
    return this.http.post<any[]>(this.baseUrl + 'Test/SearchTrain',Model)
  }
}
