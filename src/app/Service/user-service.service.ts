import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserAuthService } from './user-auth.service';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  baseUrl = 'https://localhost:5001/api/';
  requestHeader = new HttpHeaders({ "Content-Type": "application/json" });
  constructor(private http: HttpClient,
    private userAuthService: UserAuthService
  ) { }

  public login(loginData: any) {
    return this.http.post(this.baseUrl + 'Accounts/Login', loginData, {
      headers: this.requestHeader,
    });
  }
  public signup(loginData: any) {
    return this.http.post(this.baseUrl + 'Accounts/Signup', loginData, {
      headers: this.requestHeader,
    });
  }
  public roleMatch(allowedRoles: Array<string>): boolean {
    let isMatch: boolean = false;
    const userRoles: any = this.userAuthService.getRoles();
    if (userRoles != null) {

      // console.log(userRoles);
      // console.log(allowedRoles);

      for (let j = 0; j < allowedRoles.length; j++) {
        // console.log("OK", userRoles);

        if (userRoles === allowedRoles[j]) {
          isMatch = true;
          // console.log(isMatch);

          return isMatch;
        } else {
          return isMatch;
        }
      }



    }

    // if (userRoles != null && userRoles){
    //  for (let index = 0; index < allowedRoles.length; index++) {
    //   const role = allowedRoles[index];
    //   console.log(role);
    //   console.log(userRoles);
    //   if (role==userRoles) {
    //     console.log(role);
    //     console.log(userRoles);

    //     isMatch = true;
    //     return isMatch;
    //     } else {
    //     return isMatch;
    //   }
    //  }
    // }
    return isMatch;


    // if (userRoles != null && userRoles) {
    //   console.log("userRoles != null && userRoles service ");
    //     for (let j = 0; j < allowedRoles.length; j++) {
    //       if (userRoles === allowedRoles[j]) {
    //         isMatch = true;
    //         console.log("userRoles === allowedRoles[j]");

    //         return isMatch;
    //       } else {
    //         console.log("!userRoles === allowedRoles[j]");
    //         return isMatch;
    //       }
    //     }

    // }

  }
  // GetAllUsers():Observable<any>{
  //   return this.http.get<[]>(this.baseUrl + 'Accounts/GetAllUsers')
  // }
  //  GetAllStations():Observable<any[]>{
  //     return this.http.get<[]>(this.baseUrl + 'Station/GetAllStations')
  //   }
  // SearchStation(Model:any):Observable<any[]>{
  //   return this.http.post<any[]>(this.baseUrl + 'TrainUser/SearchTrain',Model)
  // }
  SearchStation(Model: any): Observable<any[]> {
    console.log('tres', Model)
    // Model.FromStation = 'ef15b875-2e77-4523-8e54-3879b0eb2e1a';
    // Model.ToStation = '9296c720-4fb1-4b29-8ef7-8385f23e9d5d';
    // Model.date = '2022-07-04';
    return this.http.post<any[]>(this.baseUrl + 'Test/SearchTrain', Model)
  }
}
