import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Category } from './category.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../app.config';
import { ResponseModel } from '../../shared/models/response.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  // private _categoriesSubject = new BehaviorSubject<Category[]>([]);
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/category`;

  getAllCategories(): Observable<ResponseModel<Category[]>>{
    return this.http.get<ResponseModel<Category[]>>(this.apiUrl);
  }

  getCategoryById(id: number): Observable<ResponseModel<Category>>{
    return this.http.get<ResponseModel<Category>>(`${this.apiUrl}/${id}`);
  }

  createCategory(data: {name: string}): Observable<ResponseModel<Category>>{
    return this.http.post<ResponseModel<Category>>(this.apiUrl, data);
  }

  updateCategory(id: number, data: {name: string}): Observable<ResponseModel<Category>>{
    return this.http.put<ResponseModel<Category>>(`${this.apiUrl}/${id}`, data);
  }

  deleteCategory(id: number): Observable<ResponseModel<Category>>{
    return this.http.delete<ResponseModel<Category>>(`${this.apiUrl}/${id}`);
  }
}
