import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { IAccessTokenPayload } from '../../auth/services/auth-http.service';

@Injectable()
export class UserService {
  private _user: IAccessTokenPayload = {}; // TODO must be userEntity

  private readonly _newUser$: ReplaySubject<IAccessTokenPayload> = new ReplaySubject<IAccessTokenPayload>(1);

  get user(): IAccessTokenPayload {
    return this._user;
  }

  set user(value: IAccessTokenPayload) {
    this._user = value;
    this._newUser$.next(this._user);
  }

  constructor() {
  }
}
