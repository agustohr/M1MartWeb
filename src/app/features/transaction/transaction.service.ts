import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../app.config';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../shared/models/response.model';
import { Transaction } from './transaction.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  http = inject(HttpClient);
  apiUrl = `${environment.apiUrl}/order`;

  constructor(private authService: AuthService) { }

  getAllTransactionsUser(): Observable<ResponseModel<Transaction[]>> {
    const username = this.authService.getCurrentUser()?.username;
    return this.http.get<ResponseModel<Transaction[]>>(`${this.apiUrl}/transaction-user/${username}`);
  }
}
