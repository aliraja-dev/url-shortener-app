import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable()
export class BitLyAuthHeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const bitly_access_token = environment.bitly_access_token;
    const modifiedRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${bitly_access_token}`)
    });
    return next.handle(modifiedRequest);
  }
}
