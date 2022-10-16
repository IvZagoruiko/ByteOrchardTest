import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { BaseDestroyDirective } from '../../../shared/directives/base-destroy.directive';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent extends BaseDestroyDirective implements OnInit {
  signInForm: FormGroup = new FormGroup<any>({});
  hasError = false;

  get loginControl(): FormControl {
    return this.signInForm?.get('login') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.signInForm?.get('password') as FormControl;
  }

  get loginError(): string {
    if (!this.loginControl || this.loginControl.valid) {
      return '';
    }

    if (this.loginControl.hasError('required')) {
      return 'Login is required';
    }

    if (this.loginControl.hasError('minlength')) {
      return `Logins min length ${this.loginControl?.errors?.['minlength']['requiredLength']}`;
    }

    return '';
  }

  get passwordError(): string {
    if (!this.passwordControl || this.passwordControl.valid) {
      return '';
    }

    if (this.passwordControl.hasError('required')) {
      return 'Password is Required';
    }

    if (this.passwordControl.hasError('minlength')) {
      return `Passwords min length ${this.passwordControl?.errors?.['minlength']['requiredLength']}`;
    }

    return '';
  }

  get disabledSignIn(): boolean {
    return this.signInForm.disabled || this.signInForm.invalid;
  }

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _authService: AuthService,
    private readonly _router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
  }

  signIn(): void {
    if (this.signInForm.invalid) {
      return;
    }

    this.signInForm.disable();
    this.hasError = false;

    this._authService.signInUsingCredentials(this.signInForm.value)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: (): void => {
          const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || `/app/profile`; // TODO url must be in constant or DI
          this._router.navigateByUrl(redirectURL)
            .catch((): void => {
              throw new Error(`Can not navigate to ${redirectURL}`);
            });
        },
        error: (err: HttpErrorResponse): void => {
          this.signInForm.enable();

          this.hasError = true;
        },
      });
  }
}
