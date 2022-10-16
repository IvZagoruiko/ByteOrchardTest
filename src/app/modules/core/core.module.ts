import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UserService } from './services/user.service';



@NgModule({
  declarations: [],
  imports: [
    SharedModule,
  ],
  exports: [
    SharedModule,
  ],
  providers: [
    UserService
  ]
})
export class CoreModule { }
