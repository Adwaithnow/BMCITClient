import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  baseUrl = 'https://localhost:5001/api/';
  constructor(private http:HttpClient) { }
  GetALlChart(){
    return this.http.get<any>(this.baseUrl+"Chart/GetAllChartsForAdmin")
  }
  AddChart(ChartDetails:any){
    return this.http.post<any[]>(this.baseUrl+"Chart/AddChart",ChartDetails)
  }
}
