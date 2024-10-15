import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductComponent } from './product/product.component';
import { ProductService } from '../product.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductComponent, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService){}
  
  ngOnInit(): void {
    this.loadProducts();
  }

  updatedList() {
    this.loadProducts();
  }

  private loadProducts() {
    const subscription = this.productService.getAllProducts().subscribe({
      next: products => this.products = products.data,
      error: err => {
        // this.isLoading = false;
        // this.errorMessage = err.message;
      },
    });
    // this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

}
