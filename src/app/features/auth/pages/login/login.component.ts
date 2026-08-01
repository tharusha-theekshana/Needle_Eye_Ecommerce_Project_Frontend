import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TextInputComponent} from '../../../../shared/components/text-input/text-input.component';
import {APP_CONFIG} from '../../../../core/config/app.config';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../../../core/services/user.service';
import {AuthSessionService} from '../../../../core/services/auth-session.service';
import {AlertMessageComponent} from '../../../../shared/components/alert-message/alert-message.component';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    TextInputComponent,
    FormsModule,
    RouterLink,
    AlertMessageComponent
  ],
  standalone : true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  brandName = APP_CONFIG.brand.name;
  currentYear: number = new Date().getFullYear();

  email = '';
  password = '';

  emailError = '';
  passwordError = '';
  errorMessage = '';

  submitting = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private authSessionService: AuthSessionService
  ) {}

  onSubmit() {
    this.emailError = '';
    this.passwordError = '';
    this.errorMessage = '';

    if (!this.email) {
      this.emailError = 'Email is required';
    } else if (!this.email.includes('@')) {
      this.emailError = 'Enter a valid email';
    }

    if (!this.password) {
      this.passwordError = 'Password is required';
    } else if (this.password.length < 6) {
      this.passwordError = 'Minimum 6 characters';
    }

    if (this.emailError || this.passwordError) {
      return;
    }

    this.submitting = true;

    this.authService.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {

        this.userService.getUserById(res.data!.userId, res.data!.token).subscribe({
          next: (userRes) => {
            this.authSessionService.setSession(
              res.data!.userId,
              res.data!.role,
              res.data!.token,
              userRes.data!.firstName,
              userRes.data!.lastName
            );
            this.submitting = false;
            this.router.navigate(['/']);
          },
          error: (err) => {
            this.submitting = false;
            this.errorMessage = 'Unable to get your account details.';
          }
        });
      },
      error: (err) => {
        this.submitting = false;
        this.errorMessage = err.error?.message || "Something went wrong. Please Try again later."
      }
    });
  }
}
