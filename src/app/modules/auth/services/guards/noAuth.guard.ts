import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class NoAuthGuard implements CanActivate {

  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this._check();
  }

  private _check(): Observable<boolean> {
    return this._authService.check()
      .pipe(
        map((authenticated: boolean): boolean => {
          if (authenticated) {
            this._router.navigate(['app/profile'])  // TODO in constant or DI must be redirect url
              .catch((): void => {
                throw new Error(`Can not navigate to app/profile`);
              });

            return false;
          }

          return true;
        }),
      );
  }
}
