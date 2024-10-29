import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../app.config';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../shared/models/response.model';
import { Catalog } from '../catalog/catalog.model';

@Injectable({
  providedIn: 'root'
})
export class LandingPageService {

  http = inject(HttpClient);
  apiUrl = `${environment.apiUrl}/catalog`;

  getNewestCatalogs(): Observable<ResponseModel<Catalog[]>> {
    return this.http.get<ResponseModel<Catalog[]>>(`${this.apiUrl}/newest`);
  }

  getTopBuyCatalogs(): Observable<ResponseModel<Catalog[]>> {
    return this.http.get<ResponseModel<Catalog[]>>(`${this.apiUrl}/top-buy`);
  }
}
