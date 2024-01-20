import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.scss',
})
export class AccountFormComponent {
  private auth: AuthenticationService = inject(AuthenticationService);

  isRegister: boolean = false;
  formHeader: 'Create Account' | 'Log In' = 'Log In';
  formSubmitText: 'Create' | 'Sign In' = 'Sign In';
  formToggleText: 'Log In' | 'Register' = 'Register';
  passwordMinLength: number = 8;
  showAuthenticationFailed: boolean = false;

  userForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.minLength(this.passwordMinLength)),
  });

  get username() {
    return this.userForm.get('username');
  }

  get password() {
    return this.userForm.get('password');
  }

  toggleRegister() {
    this.isRegister = !this.isRegister;
    this.formHeader = this.isRegister ? 'Create Account' : 'Log In';
    this.formSubmitText = this.isRegister ? 'Create' : 'Sign In';
    this.formToggleText = this.isRegister ? 'Log In' : 'Register';
  }

  onSubmit() {
    if (this.userForm.valid) {
      if (this.isRegister) {
        this.auth
          .register(this.username?.value, this.password?.value)
          .subscribe(
            (res) => {
              sessionStorage.setItem('token', res.token);
              this.auth.tokenAvailable.set(true);
            },
            (error) => {
              this.showAuthenticationFailed = true;
            }
          );
      } else {
        this.auth.login(this.username?.value, this.password?.value).subscribe(
          (res) => {
            sessionStorage.setItem('token', res.token);
            this.auth.tokenAvailable.set(true);
          },
          (error) => {
            this.showAuthenticationFailed = true;
          }
        );
      }
    }
  }
}
