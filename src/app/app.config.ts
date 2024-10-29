import { APP_INITIALIZER, ApplicationConfig, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { JwtService } from './features/auth/jwt.service';
import { AuthService } from './features/auth/auth.service';
import { EMPTY } from 'rxjs';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

const initAuth = () => {
  const jwtService = inject(JwtService);
  const authService = inject(AuthService);
  return () => (jwtService.getToken() ? authService.getCurrentUser() : EMPTY);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([])),
    {
      provide: APP_INITIALIZER,
      useFactory: initAuth,
      multi: true
    }, provideCharts(withDefaultRegisterables())
  ]
};

export const environment = {
  apiUrl: 'http://localhost:5020/api/v1'
}
