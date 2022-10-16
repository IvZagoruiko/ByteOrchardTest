import { Component } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {

  get name(): string | undefined { // TODO need change settings
    return this._userService.user.userName;
  }

  constructor(
    private readonly _authService: AuthService,
    private readonly _userService: UserService,
  ) {
  }

  signOut(): void {
    this._authService.signOut();
  }
}
