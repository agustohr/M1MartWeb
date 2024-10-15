import { Component } from '@angular/core';
import { TransactionListComponent } from "./transaction-list/transaction-list.component";

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [TransactionListComponent],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent {

}
