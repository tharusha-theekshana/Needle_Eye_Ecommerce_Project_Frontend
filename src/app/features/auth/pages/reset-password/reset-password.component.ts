import { Component } from '@angular/core';
import {ValidationConstants} from '../../../../shared/constants/validation.constants';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {APP_CONFIG} from '../../../../core/config/app.config';
import {AlertMessageComponent} from '../../../../shared/components/alert-message/alert-message.component';
import {FormsModule} from '@angular/forms';
import {TextInputComponent} from '../../../../shared/components/text-input/text-input.component';

@Component({
  selector: 'app-reset-password',
  imports: [
    AlertMessageComponent,
    FormsModule,
    TextInputComponent
  ],
  standalone: true,
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  brandName = APP_CONFIG.brand.name;
  currentYear: number = new Date().getFullYear();

  email = '';
  newPassword = '';
  confirmPassword = '';

  newPasswordError = '';
  confirmPasswordError = '';
  errorMessage = '';

  submitting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.email = this.route.snapshot.queryParamMap.get('email') || '';

    if (!this.email) {
      // No email to reset the password for, restart the flow.
      this.router.navigate(['/forgot-password']);
    }
  }

  onSubmit() {
    this.newPasswordError = '';
    this.confirmPasswordError = '';
    this.errorMessage = '';

    if (!this.newPassword) {
      this.newPasswordError = 'New password is required';
    } else if (!ValidationConstants.PASSWORD_REGEX.test(this.newPassword)) {
      this.newPasswordError = 'Password must contain at least one uppercase letter and one number';
    }

    if (!this.confirmPassword) {
      this.confirmPasswordError = 'Please confirm your new password';
    } else if (this.newPassword !== this.confirmPassword) {
      this.confirmPasswordError = 'Passwords do not match';
    }

    if (this.newPasswordError || this.confirmPasswordError) {
      return;
    }

    this.submitting = true;

    this.authService.resetPassword(this.email, this.newPassword).subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.submitting = false;
        this.errorMessage = err.error?.message || 'Something went wrong. Please try again later.';
      }
    });
  }
}
