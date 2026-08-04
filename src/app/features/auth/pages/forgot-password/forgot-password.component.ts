import { Component } from '@angular/core';
import {APP_CONFIG} from '../../../../core/config/app.config';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {ValidationConstants} from '../../../../shared/constants/validation.constants';
import {FormsModule} from '@angular/forms';
import {TextInputComponent} from '../../../../shared/components/text-input/text-input.component';
import {AlertMessageComponent} from '../../../../shared/components/alert-message/alert-message.component';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  imports: [
    FormsModule,
    TextInputComponent,
    AlertMessageComponent,
    RouterLink,
    NgOptimizedImage
  ],
  standalone: true,
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  brandName = APP_CONFIG.brand.name;
  currentYear: number = new Date().getFullYear();

  email = '';

  emailError = '';
  errorMessage = '';

  submitting = false;

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    this.emailError = '';
    this.errorMessage = '';

    if (!this.email.trim()) {
      this.emailError = 'Email is required';
    } else if (!ValidationConstants.EMAIL_REGEX.test(this.email.trim())) {
      this.emailError = 'Enter a valid email address';
    }

    if (this.emailError) {
      return;
    }

    this.submitting = true;

    this.authService.forgotPassword(this.email.trim()).subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigate(['/otp-verification'], { queryParams: { email: this.email.trim() } });
      },
      error: (err) => {
        this.submitting = false;
        this.errorMessage = err.error?.message || 'Something went wrong. Please try again later.';
      }
    });
  }
}
