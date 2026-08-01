import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthSessionService{
  setSession(userId: string, role: string, token: string, firstName: string, lastName: string): void {
    localStorage.setItem('userId', userId);
    localStorage.setItem('role', role);
    localStorage.setItem('token', token);
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
  }

  getFirstName(): string | null {
    return localStorage.getItem('firstName');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
  }
}
