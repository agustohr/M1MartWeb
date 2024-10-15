import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../app.config';
import { OrderDetail } from '../order.model';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent implements OnInit {
  @Input({required: true}) invoiceNumber!: string;

  orderDetails!: OrderDetail[];
  
  constructor(private orderService: OrderService){}
  ngOnInit(): void {
    this.orderService.getOrderDetailByInvoiceNumber(this.invoiceNumber).subscribe({
      next: res => {
        this.orderDetails = res.data;
        this.orderDetails.forEach(orderDetail => {
          orderDetail.imgSrc = `${environment.apiUrl}/product/${orderDetail.productId}/product-image`
        })
      }
    });
  }
}
