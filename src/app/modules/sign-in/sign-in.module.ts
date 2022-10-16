import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../shared/shared.module';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignInRoutingModule } from './sign-in-routing.module';


@NgModule({
  declarations: [
    SignInComponent,
  ],
  imports: [
    SharedModule,
    SignInRoutingModule,
    MatButtonModule,
    MatInputModule,
  ],
})
export class SignInModule {
}
