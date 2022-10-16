import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/auth/services/guards/auth.guard';
import { NoAuthGuard } from './modules/auth/services/guards/noAuth.guard';

const routes: Routes = [
  {
    path: 'app',
    loadChildren: () => import('../app/modules/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('../app/modules/sign-in/sign-in.module').then(m => m.SignInModule),
    canActivate: [NoAuthGuard],
  },
  {
    path: '**',
    redirectTo: 'app',
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {
}
