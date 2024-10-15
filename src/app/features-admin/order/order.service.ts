import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../app.config';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../shared/models/response.model';
import { Order, OrderDetail } from './order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/order`;
  private apiUrlOrderDetail = `${environment.apiUrl}/orderdetail`;

  getAllOrders(): Observable<ResponseModel<Order[]>>{
    return this.http.get<ResponseModel<Order[]>>(this.apiUrl);
  }

  getOrderDetailByInvoiceNumber(invoiceNumber: string): Observable<ResponseModel<OrderDetail[]>>{
    return this.http.get<ResponseModel<OrderDetail[]>>(`${this.apiUrlOrderDetail}/${invoiceNumber}`);
  }
}
