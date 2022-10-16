import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private _sequence = 0;
  private readonly _prefix: string = Math.random().toString(36).substring(7);

  constructor(
    private readonly _authService: AuthService,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this._addSharedHeaders(req));
  }

  private _addTransactionId(req: HttpRequest<any>): HttpRequest<any> {
    return req.clone({
      headers: req.headers.set('X-Transaction-ID', `nja-${this._prefix}-${this._sequence++}`),
    });
  }

  private _addAccessToken(req: HttpRequest<any>): HttpRequest<any> {
    return req.clone({
      headers: req.headers.set('Authorization', `Bearer ${this._authService.accessToken}`),
    });
  }

  private _addSharedHeaders(req: HttpRequest<any>): HttpRequest<any> {
    req = this._addTransactionId(req);
    req = this._addAccessToken(req);

    return req;
  }
}
