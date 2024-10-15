import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { Transaction } from '../transaction.model';
import { environment } from '../../../app.config';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAnglesDown, faAnglesUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, FontAwesomeModule],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css'
})
export class TransactionListComponent implements OnInit {
  transactions: Transaction[] = [];
  arrowDownIcon = faAnglesDown
  arrowUpIcon = faAnglesUp

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.transactionService.getAllTransactionsUser().subscribe({
      next: (res) => {
        this.transactions = res.data;
        this.transactions.forEach(transaction => {
          transaction.isShowDetail = false;
          transaction.transactionDetails.forEach(transactionDetail => {
            transactionDetail.imgSrc = `${environment.apiUrl}/product/${transactionDetail.productId}/product-image`;
          })
        })
      }
    })
  }

}
