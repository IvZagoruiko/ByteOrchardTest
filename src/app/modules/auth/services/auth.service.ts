import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { UserService } from '../../core/services/user.service';
import { AuthHttpService, ITokensResponse } from './auth-http.service';

export interface IAuthCredential {
  login: string;
  password: string;
}

@Injectable()
export class AuthService {
  private _tokens: ITokensResponse | null = null; // TODO need change settings

  private readonly _keyInStorage = 'auth-tokens';

  get accessToken(): string {
    return <string>this._tokens?.accessToken;
  }

  constructor(
    private readonly _userService: UserService,
    private readonly _router: Router,
    private readonly _authHttpService: AuthHttpService,
  ) {
    this._initTokensFromLocalStorage();
  }

  signInUsingCredentials(credentials: IAuthCredential): Observable<boolean> {
    return this._authHttpService.signInUsingCredentials(credentials)
      .pipe(
        map((response: ITokensResponse): boolean => {
          this._setTokens(response);

          return true;
        }),
      );
  }

  signOut(): void {
    this._setTokens({});
    this._redirectToSignIn(this._router.url);
  }

  check(): Observable<boolean> {
    return this.accessToken ? of(true) : of(false);
  }

  private _initTokensFromLocalStorage(): void {
    const tokens = localStorage.getItem(this._keyInStorage) ?? null;

    try {
      // @ts-ignore // TODO need change settings
      this._setTokens(JSON.parse(tokens));
    } catch {
      throw new Error('Can not parse tokens');
    }
  }

  private _setTokens(value: ITokensResponse | null): void { // TODO need change settings
    this._tokens = value;
    if (this.accessToken) {
      this._userService.user = jwtDecode(this.accessToken);
    }

    const tokens = JSON.stringify(this._tokens);
    localStorage.setItem(this._keyInStorage, tokens);
  }

  private _redirectToSignIn(redirectURL: string): void {
    this._router.navigate(['auth/signin'], {queryParams: {redirectURL}})
      .catch((): void => {
        throw new Error('Can not navigate to auth/signin');
      });
  }
}
