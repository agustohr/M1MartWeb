import { CurrencyPipe } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CatalogDetail } from '../catalog.model';
import { CatalogService } from '../catalog.service';
import { environment } from '../../../app.config';
import { CartService } from '../../cart/cart.service';
import { AuthService } from '../../auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-catalog-detail',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './catalog-detail.component.html',
  styleUrl: './catalog-detail.component.css'
})
export class CatalogDetailComponent implements OnInit {
  @Input({required: true}) id!:number;
  catalog: CatalogDetail = {} as CatalogDetail;
  // price: number = 500000;
  quantity: number = 1;
  // stock: number = 10;
  route = inject(Router);

  constructor(private catalogService: CatalogService, private cartService: CartService, private authService: AuthService) { }

  ngOnInit(): void {
    this.catalogService
    .getCatalogById(this.id)
    .subscribe((res) => {
      this.catalog = res.data;
    })
  }

  get imgSrc() {
    return `${environment.apiUrl}/product/${this.catalog.id}/product-image`;
  }

  onAddQuantity() {
    if(this.quantity < this.catalog.stock){
      this.quantity = this.quantity + 1;
    }
  }

  onSubQuantity() {
    if(this.quantity > 1){
      this.quantity = this.quantity - 1;
    }
  }

  onAddToCart(){
    this.cartService.createCart({
      productId: this.catalog.id,
      buyerUsername: this.authService.getCurrentUser()?.username!,
      quantity: this.quantity,
    }).subscribe((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Product added to cart',
        confirmButtonText: 'OK',
      }).then(() => {
        this.route.navigate(['cart']);
      })
    });
  }
}
