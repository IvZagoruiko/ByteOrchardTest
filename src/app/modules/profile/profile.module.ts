import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { SharedModule } from '../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    SharedModule,
    ProfileRoutingModule,
    MatDividerModule,
    MatButtonModule,
  ],
})
export class ProfileModule {
}
