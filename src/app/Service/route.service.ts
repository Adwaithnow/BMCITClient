import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http:HttpClient) { }
  AddRoute(route:any[]){
    return this.http.post<any[]>(this.baseUrl+"Route/AddRoute",route)
  }
  GetOneRouteById(id:string){
    return this.http.get<any>(this.baseUrl+"Route/GetOneRoutesById/"+id)
  }
  GetAllRouteForAdmin(){
    return this.http.get<any[]>(this.baseUrl+"TrainUser/GetAllRoutesAdmin")
  }
  
}
