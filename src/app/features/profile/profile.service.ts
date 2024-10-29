import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../app.config';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../shared/models/response.model';
import { Profile } from './profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http = inject(HttpClient);
  apiUrl = `${environment.apiUrl}/user`;

  getUserByUsername(username: string): Observable<ResponseModel<Profile>> {
    return this.http.get<ResponseModel<Profile>>(`${this.apiUrl}/${username}`);
  }
}
