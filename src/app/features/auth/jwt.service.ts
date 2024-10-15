import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  getToken(): string {
    // return localStorage.getItem('jwtToken') || '';
    return window.localStorage['jwtToken'];
  }

  setToken(token: string): void {
    window.localStorage['jwtToken'] = token;
  }

  removeToken(): void {
    window.localStorage.removeItem('jwtToken');
  }

  decodeToken(token: string): any {
    return jwtDecode(token);
  }
}
