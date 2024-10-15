import { Component, Input } from '@angular/core';
import { Product } from '../../product.model';
import { environment } from '../../../../app.config';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductService } from '../../product.service';
import { ProductListComponent } from '../product-list.component';

@Component({
  selector: 'tr[appProduct]',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input({required: true}) product!: Product;

  constructor(private productService: ProductService, private productListComponent: ProductListComponent) {}
  
  get imgSrc() {
    return `${environment.apiUrl}/product/${this.product.id}/product-image`;
  }

  onDeleteProduct(id: number) {
    Swal.fire({
      title: "Are you sure \nDelete this category?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(id).subscribe({
          next: () => {
            Swal.fire({
              title: "Deleted!",
              text: "This product has been deleted.",
              icon: "success"
            });
            this.productListComponent.updatedList();
          },
        });

        
      }
    });
  }
}
