import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse
} from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req)
    .pipe(
      retry(1),
      catchError(error => {
        let errorMessage: string;
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else {
          errorMessage = this.getErrorMessage(error);
        }
        return throwError(()=> errorMessage);
      })
    );;
  }

  public getErrorMessage(error: HttpErrorResponse) {
    switch (error.status) {
      case 403: {
        return `Access Denied: ${error.error.message}`;
      }
      case 404: {
        return `Not Found: ${error.error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.error.message}`;
      }
    }
  }
}
