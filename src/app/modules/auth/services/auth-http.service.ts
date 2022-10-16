import { Injectable } from '@angular/core';
import { IAuthCredential } from './auth.service';
import { Observable, of, throwError } from 'rxjs';
import { HttpBackend } from '@angular/common/http';

export interface ITokensResponse {
  accessToken?: string; // TODO also must be refresh token
}

export interface IAccessTokenPayload {
  userName?: string;
}

interface IMockData {
  login: string;
  password: string;
  tokens: ITokensResponse;
}

const MOCK_DATA: Array<IMockData> = [
  {
    login: 'test',
    password: 'test', // TODO in console error because token is mock
    tokens: {
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ItCY0LLQsNC9INCX0LDQs9C-0YDRg9C50LrQviIsImlhdCI6MTY2NTk1MTAxOH0.gqMmOSFLb6lI1ABq-syZZLdTzi10-FKRkmp-9UeQADQ',
    }
  }
]

@Injectable()
export class AuthHttpService {

  constructor(
    private readonly _httpBackEnd: HttpBackend, // TODO not trigger interceptor
  ) { }

  signInUsingCredentials(credential: IAuthCredential): Observable<ITokensResponse> {
    // TODO request to BE
    const result = MOCK_DATA.find((item: IMockData): boolean => item.login === credential.login && item.password === credential.password);

    return result ? of(result.tokens) : throwError('Incorrect data');
  }
}
