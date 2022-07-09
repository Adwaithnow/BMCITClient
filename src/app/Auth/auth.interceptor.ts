import { Injectable, ViewChild } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} 
from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { UserAuthService } from '../Service/user-auth.service';
import { LoginComponent } from '../components/Shared/login/login.component';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private userAuthService: UserAuthService,
    private router: Router
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.headers.get('Content-Type') === 'application/json') {
      return next.handle(req.clone());
    }

    const token = this.userAuthService.getToken();

    req = this.addToken(req, token);

    return next.handle(req).pipe(
      catchError(
        (err: HttpErrorResponse) => {
          console.log(err.status);
          if (err.status === 401) {
            this.router.navigate(['/login']);
          } else if (err.status === 403) {
            this.router.navigate(['/forbidden']);
          }
          return throwError("Some thing is wrong");
        }
      )
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone(
      {
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
}
