import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {TextInputComponent} from "../../../../shared/components/text-input/text-input.component";
import {APP_CONFIG} from '../../../../core/config/app.config';
import {ValidationConstants} from '../../../../shared/constants/validation.constants';
import {AuthService} from '../../services/auth.service';
import {AlertMessageComponent} from '../../../../shared/components/alert-message/alert-message.component';
import {AuthSessionService} from '../../../../core/services/auth-session.service';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    TextInputComponent,
    AlertMessageComponent
  ],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  brandName = APP_CONFIG.brand.name;
  currentYear: number = new Date().getFullYear();

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  mobileNumber: string = '';
  userRole: string = 'USER';

  // Error Messages
  errorMessage: string = '';
  firstNameError: string = '';
  lastNameError: string = '';
  emailError: string = '';
  passwordError: string = '';
  mobileNumberError: string = '';

  submitting = false;

  constructor(private router: Router, private authService: AuthService, private authSessionService: AuthSessionService) {
  }

  onRegister() {
    this.firstNameError = '';
    this.lastNameError = '';
    this.emailError = '';
    this.passwordError = '';
    this.mobileNumberError = '';

    if (!this.firstName.trim()) {
      this.firstNameError = 'First name is required';
    } else if (!ValidationConstants.NAME_REGEX.test(this.firstName.trim())) {
      this.firstNameError = 'First name can contain only letters and single spaces';
    }

    if (!this.lastName.trim()) {
      this.lastNameError = 'Last name is required';
    } else if (!ValidationConstants.NAME_REGEX.test(this.lastName.trim())) {
      this.lastNameError = 'Last name can contain only letters and single spaces';
    }

    if (!this.email.trim()) {
      this.emailError = 'Email is required';
    } else if (!ValidationConstants.EMAIL_REGEX.test(this.email.trim())) {
      this.emailError = 'Enter a valid email address';
    }

    if (!this.mobileNumber.trim()) {
      this.mobileNumberError = 'Mobile number is required';
    } else if (!ValidationConstants.MOBILE_REGEX.test(this.mobileNumber.trim())) {
      this.mobileNumberError = 'Enter a valid mobile number';
    }

    if (!this.password.trim()) {
      this.passwordError = 'Password is required';
    } else if (!ValidationConstants.PASSWORD_REGEX.test(this.password)) {
      this.passwordError = 'Password must contain at least one uppercase letter and one number';
    }

    if (
      this.firstNameError || this.lastNameError || this.emailError ||
      this.passwordError || this.mobileNumberError
    ) {
      return;
    }

    this.submitting = true;

    this.authService.register({
      firstName: this.firstName.trim(),
      lastName: this.lastName.trim(),
      email: this.email.trim(),
      password: this.password,
      mobileNumber: this.mobileNumber.trim(),
      userRole: this.userRole
    }).subscribe({
      next: (res) => {

        // After register success call login API automatically
        this.authService.login({
          email: this.email.trim(),
          password: this.password
        }).subscribe({
          next: (loginRes) => {
            this.authSessionService.setSession(
              loginRes.data!.userId,
              loginRes.data!.role,
              loginRes.data!.token,
              this.firstName.trim(),
              this.lastName.trim()
            );
            this.submitting = false;
            setTimeout(() => {
              this.router.navigate(['/']).then(r => false);
            }, 2000);
          },
          error: () => {
            this.submitting = false;
            this.router.navigate(['/login']).then(r => false);
          }
        });
      },
      error: (err) => {
        console.log(err);
        this.submitting = false;
        this.errorMessage = err.error?.message || "Something went wrong. Please Try again later."
      }
    });
  }
}
