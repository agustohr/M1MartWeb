import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../app.config';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { LoginCredentials, RegisterCredentials, UserAuthenticated } from './auth.model';
import { JwtService } from './jwt.service';
import { ResponseModel } from '../../shared/models/response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  apiUrl = environment.apiUrl + '/Auth';
  // private _loggedInUserSubject = new BehaviorSubject<UserAuthenticated | null>(null);
  // currentUser$ = this._loggedInUserSubject.asObservable();
  // isAuthenticated$ = this.currentUser$.pipe(map(user => !!user));

  constructor(private jwtService: JwtService){}

  register(credentials: RegisterCredentials): Observable<ResponseModel<string>> {
    return this.http.post<ResponseModel<string>>(this.apiUrl + '/register', credentials);
  }

  login(credentials: LoginCredentials): Observable<ResponseModel<UserAuthenticated>> {
    return this.http.post<ResponseModel<UserAuthenticated>>(this.apiUrl + '/login', credentials).pipe(
      tap((response) => {
        this.setAuth(response.data);
      })
    );
  }

  logout(): void {
    this.purgeAuth();
  }

  getCurrentUser() {
    const token = this.jwtService.getToken();
    if(!token) return null;
    const decoded: any = this.jwtService.decodeToken(token);
    const user: {username: string, role: string} = {
      username: decoded.username,
      role: decoded.role,
    }
    
    return user;
  }

  isLoggedIn = (): boolean => {
    const token = this.jwtService.getToken();
    if(!token) return false;

    return !this.isTokeExpired(token);
  }
  
  private isTokeExpired(token: string) {
    const decoded = this.jwtService.decodeToken(token);
    const isTokenExpired = Date.now() >= decoded['exp']! * 1000;
    if(isTokenExpired) this.logout();
    return isTokenExpired;
  }

  // getCurrentUser() {
  //   return this.http.get<UserAuthenticated>(this.apiUrl).pipe(
  //     tap({
  //       next: (user) => {
  //         this.setAuth(user);
  //       },
  //       error: () => {
  //         this.purgeAuth();
  //         window.location.href = '';
  //       }
  //     }),
  //     catchError(() => throwError(() => console.log('Gagal mengambil data user')))
  //   );
  // }

  private setAuth(user: UserAuthenticated): void {
    // this._loggedInUserSubject.next(user);
    this.jwtService.setToken(user.token);
  }

  private purgeAuth(): void {
    // this._loggedInUserSubject.next(null);
    this.jwtService.removeToken();
  }
}
