import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../Service/user-auth.service';
import { UserServiceService } from '../Service/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  /**
   *
   */
  
  constructor(
    
    private userAuthService: UserAuthService,
    private router: Router,
    private userService: UserServiceService
  ) {
  
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.userAuthService.getToken() !== null) {
        const role = route.data['roles']  as Array<string>;
  
        if (role) {
          const match = this.userService.roleMatch(role);
  
          if (match) {
            console.log("matched guard");

            return true;
          } else {
            console.log("!matched guard");
            this.router.navigate(['/forbidden']);
            return false;
          }
        }
      }
      this.router.navigate(['/login']);
      return false;
  }
  
}
