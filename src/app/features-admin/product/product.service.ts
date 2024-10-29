import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../app.config';
import { Observable } from 'rxjs';
import { Pagination, ResponseModel } from '../../shared/models/response.model';
import { Product, ProductParams } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/product`;

  getAllProducts(): Observable<ResponseModel<Product[]>>{
    return this.http.get<ResponseModel<Product[]>>(this.apiUrl);
  }

  getAllProductsFiltered({productName, categoryName, pageNumber}: ProductParams): Observable<ResponseModel<Pagination<Product>>>{
    return this.http.get<ResponseModel<Pagination<Product>>>(`${this.apiUrl}/filter`, {params: {productName, categoryName, pageNumber}});
  }

  getProductById(id: number): Observable<ResponseModel<Product>>{
    return this.http.get<ResponseModel<Product>>(`${this.apiUrl}/${id}`);
  }

  createProduct(data: FormData): Observable<ResponseModel<Product>>{
    return this.http.post<ResponseModel<Product>>(this.apiUrl, data);
  }

  updateProduct(id: number, data: FormData): Observable<ResponseModel<Product>>{
    return this.http.put<ResponseModel<Product>>(`${this.apiUrl}/${id}`, data);
  }

  deleteProduct(id: number): Observable<ResponseModel<Product>>{
    return this.http.delete<ResponseModel<Product>>(`${this.apiUrl}/${id}`);
  }
}
