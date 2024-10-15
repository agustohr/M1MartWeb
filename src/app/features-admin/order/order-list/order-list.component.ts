import { Component, OnInit } from '@angular/core';
import { Order } from '../order.model';
import { OrderService } from '../order.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ModalComponent } from "../../../shared/components/modal/modal.component";
import { OrderDetailComponent } from "../order-detail/order-detail.component";
import { ModalService } from '../../../shared/components/modal/modal.service';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, ModalComponent, OrderDetailComponent],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  showModal: boolean = false;
  invoiceNumber!: string;
  
  constructor(private orderService: OrderService, private modalService: ModalService) {}

  ngOnInit(): void {
    this.loadOrders();
    this.modalService.isShowModal$.subscribe((isOpen) => (this.showModal = isOpen));
  }

  private loadOrders() {
    this.orderService.getAllOrders().subscribe({
      next: orders => {
        this.orders = orders.data;
      }
    })
  }

  onViewDetail(invoiceNumber: string) {
    this.modalService.setTitle('Order Detail');
    this.invoiceNumber = invoiceNumber;
    this.modalService.openCloseModal(true);
  }

}
