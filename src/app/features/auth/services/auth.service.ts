import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RegisterPayload} from '../models/register-payload.models';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../../core/models/api-response.model';
import {API_ENDPOINTS} from '../../../core/constants/api-endpoints.constants';
import {LoginPayload} from '../models/login-payload.models';
import {LoginResponseData} from '../models/login-response-data.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  register(payload: RegisterPayload): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(API_ENDPOINTS.AUTH.REGISTER, payload);
  }

  login(payload: LoginPayload): Observable<ApiResponse<LoginResponseData>> {
    return this.http.post<ApiResponse<LoginResponseData>>(API_ENDPOINTS.AUTH.LOGIN, payload);
  }

  forgotPassword(email: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
  }

  verifyOtp(email: string, otp: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(API_ENDPOINTS.AUTH.OTP_VERIFICATION, { email, otp });
  }

  resetPassword(email: string, newPassword: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(API_ENDPOINTS.AUTH.RESET_PASSWORD, { email, newPassword });
  }
}
