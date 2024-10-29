import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../app.config';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../shared/models/response.model';
import { Dashboard, MonthlySalesTrend } from './dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  http = inject(HttpClient);
  apiUrl = `${environment.apiUrl}/dashboard`;

  getData(): Observable<ResponseModel<Dashboard>> {
    return this.http.get<ResponseModel<Dashboard>>(this.apiUrl);
  }
  
  getMonthlySales(year: number): Observable<ResponseModel<MonthlySalesTrend[]>> {
    return this.http.get<ResponseModel<MonthlySalesTrend[]>>(`${this.apiUrl}/monthly-sales/${year}`);
  }
}
