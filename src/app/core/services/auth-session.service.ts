import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthSessionService{

  // When remember me ticked user data stay stored
  setSession(userId: string, role: string, token: string, firstName: string, lastName: string, rememberMe: boolean = false): void {
    const storage = rememberMe ? localStorage : sessionStorage;
    const other = rememberMe ? sessionStorage : localStorage;

    this.clear(other);

    storage.setItem('userId', userId);
    storage.setItem('role', role);
    storage.setItem('token', token);
    storage.setItem('firstName', firstName);
    storage.setItem('lastName', lastName);
  }

  getFirstName(): string | null {
    return localStorage.getItem('firstName') || sessionStorage.getItem('firstName');
  }

  getToken(): string | null {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.clear(localStorage);
    this.clear(sessionStorage);
  }

  private clear(storage: Storage): void {
    storage.removeItem('userId');
    storage.removeItem('role');
    storage.removeItem('token');
    storage.removeItem('firstName');
    storage.removeItem('lastName');
  }
}
