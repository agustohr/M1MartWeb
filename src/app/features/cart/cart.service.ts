import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../app.config';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../shared/models/response.model';
import { AddCart, Cart, CartUser, CheckoutCart } from './cart.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/cart`;
  private apiOrderUrl = `${environment.apiUrl}/order`;
  constructor(private authService: AuthService) { }

  // getCarts(): Observable<ResponseModel<Cart[]>>{
  //   return this.http.get<ResponseModel<Cart[]>>(this.apiUrl);
  // }

  getCartsByUsername(): Observable<ResponseModel<CartUser[]>>{
    const username = this.authService.getCurrentUser()?.username;
    return this.http.get<ResponseModel<CartUser[]>>(`${this.apiUrl}/user/${username}`);
  }

  createCart(data: AddCart): Observable<ResponseModel<Cart>>{
    return this.http.post<ResponseModel<Cart>>(this.apiUrl, data);
  }

  deleteCart(id: number): Observable<ResponseModel<Cart>>{
    return this.http.delete<ResponseModel<Cart>>(`${this.apiUrl}/${id}`);
  }

  deleteCartByUsername(): Observable<ResponseModel<Cart>>{
    const username = this.authService.getCurrentUser()?.username;
    return this.http.delete<ResponseModel<Cart>>(`${this.apiUrl}/user/${username}`);
  }

  checkoutCart(data: CheckoutCart): Observable<ResponseModel<Cart>>{
    console.log(data);
    
    return this.http.post<ResponseModel<Cart>>(`${this.apiOrderUrl}/checkout`, data);
  }
}
