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
  SearchStation(Model:any):Observable<any[]>{
    return this.http.post<any[]>(this.baseUrl + 'TrainUser/SearchTrain',Model)
  }
}
