import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { CommonService } from 'src/app/core/service/service.index';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private services:CommonService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError((err) => {
      if (err.status === 401) {
        this.services.logout();
      }
      return throwError(err);
    })
    );
  }
}

