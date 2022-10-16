import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from './services/auth.service';
import { AuthHttpService } from './services/auth-http.service';
import { AuthInterceptor } from './services/auth.interceptor';
import { AuthGuard } from './services/guards/auth.guard';
import { NoAuthGuard } from './services/guards/noAuth.guard';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
  ],
  providers: [
    AuthService,
    AuthHttpService,

    AuthGuard,
    NoAuthGuard,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ]
})
export class AuthModule { }
