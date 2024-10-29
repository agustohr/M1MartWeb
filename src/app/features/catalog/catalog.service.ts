import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../app.config';
import { Observable } from 'rxjs';
import { Pagination, ResponseModel } from '../../shared/models/response.model';
import { Catalog, CatalogDetail } from './catalog.model';
import { ProductParams } from '../../features-admin/product/product.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/catalog`;

  getAllCatalogs(): Observable<ResponseModel<Catalog[]>>{
    return this.http.get<ResponseModel<Catalog[]>>(this.apiUrl);
  }

  getAllCatalogsFiltered({productName, categoryName, pageNumber}: ProductParams): Observable<ResponseModel<Pagination<Catalog>>>{
    return this.http.get<ResponseModel<Pagination<Catalog>>>(`${this.apiUrl}/filter`, {params: {productName, categoryName, pageNumber}});
  }

  getCatalogById(id: number): Observable<ResponseModel<CatalogDetail>>{
    return this.http.get<ResponseModel<CatalogDetail>>(`${this.apiUrl}/detail/${id}`);
  }
}
