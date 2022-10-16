import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this._check(state.url);
  }

  private _check(redirectURL: string): Observable<boolean> {
    return this._authService.check()
      .pipe(
        map((authenticated: boolean): boolean => {
          if (!authenticated) {
            this._router.navigate(['auth/signin'], {queryParams: {redirectURL}}) // TODO url must be in constant or DI
              .catch((): void => {
                throw new Error('Can not navigate to auth/signin');
              });

            return false;
          }

          return true;
        }),
      );
  }
}
