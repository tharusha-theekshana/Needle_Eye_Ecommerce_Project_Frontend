import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {APP_CONFIG} from '../../../../core/config/app.config';
import {AlertMessageComponent} from '../../../../shared/components/alert-message/alert-message.component';
import {FormsModule} from '@angular/forms';
import {TextInputComponent} from '../../../../shared/components/text-input/text-input.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-otp-verification',
  imports: [
    AlertMessageComponent,
    FormsModule,
    TextInputComponent,
    NgIf
  ],
  standalone: true,
  templateUrl: './otp-verification.component.html',
  styleUrl: './otp-verification.component.css'
})
export class OtpVerificationComponent implements OnInit, OnDestroy {
  brandName = APP_CONFIG.brand.name;
  currentYear: number = new Date().getFullYear();

  email = '';
  otp = '';

  otpError = '';
  errorMessage = '';
  infoMessage = '';

  submitting = false;
  resending = false;

  // For OTP timer
  private readonly OTP_DURATION_SECONDS = 5 * 60;
  remainingSeconds = this.OTP_DURATION_SECONDS;
  timerDisplay = '05:00';
  resendDisabled = true;
  private timerHandle: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.email = this.route.snapshot.queryParamMap.get('email') || '';

    if (!this.email) {
      this.router.navigate(['/forgot-password']).then(r => false);
    }

    this.startTimer();
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  // On submit
  onSubmit() {
    this.otpError = '';
    this.errorMessage = '';

    if (!this.otp.trim()) {
      this.otpError = 'OTP is required';
    } else if (!/^\d{6}$/.test(this.otp.trim())) {
      this.otpError = 'Enter the 6 digit code';
    }

    if (this.otpError) {
      return;
    }

    this.submitting = true;

    this.authService.verifyOtp(this.email, this.otp.trim()).subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigate(['/reset-password'], {queryParams: {email: this.email}}).then(r => false);
      },
      error: (err) => {
        this.submitting = false;
        this.errorMessage = err.error?.message || 'Invalid or expired code.';
      }
    });
  }

  // Resend OTP
  resendOtp() {
    if (this.resendDisabled || this.resending) {
      return;
    }

    this.errorMessage = '';
    this.infoMessage = '';
    this.resending = true;

    this.authService.forgotPassword(this.email).subscribe({
      next: () => {
        this.resending = false;
        this.infoMessage = 'A new code has been sent to your email.';
        this.startTimer();
      },
      error: (err) => {
        this.resending = false;
        this.errorMessage = err.error?.message || 'Could not resend the code. Please try again.';
      }
    });
  }

  private startTimer(): void {
    this.clearTimer();

    this.remainingSeconds = this.OTP_DURATION_SECONDS;
    this.resendDisabled = true;
    this.updateTimerDisplay();

    this.timerHandle = setInterval(() => {
      this.remainingSeconds--;

      if (this.remainingSeconds <= 0) {
        this.remainingSeconds = 0;
        this.resendDisabled = false;
        this.clearTimer();
      }

      this.updateTimerDisplay();
    }, 1000);
  }

  private clearTimer(): void {
    if (this.timerHandle) {
      clearInterval(this.timerHandle);
      this.timerHandle = null;
    }
  }

  private updateTimerDisplay(): void {
    const minutes = Math.floor(this.remainingSeconds / 60);
    const seconds = this.remainingSeconds % 60;
    this.timerDisplay = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}
