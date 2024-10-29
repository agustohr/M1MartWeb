import { CurrencyPipe } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CatalogDetail } from '../catalog.model';
import { CatalogService } from '../catalog.service';
import { environment } from '../../../app.config';
import { CartService } from '../../cart/cart.service';
import { AuthService } from '../../auth/auth.service';
import Swal from 'sweetalert2';
import { CheckoutCart, DetailOrder } from '../../cart/cart.model';

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

  private checkUserAuthenticated(): string | null {
    const username = this.authService.getCurrentUser()?.username!;
    if(!username){
      Swal.fire({
        icon: 'error',
        title: 'Please login first',
        // text: 'Please login first',
        confirmButtonText: 'OK',
      }).then(() => {
        this.route.navigate(['auth/login']);
      })
      
      return null;
    }
    return username;
  }

  onBuy(){
    Swal.fire({
      title: "Are you sure \nCheckout this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, checkout it!"
    }).then((result) => {
      if (result.isConfirmed) {
        const username = this.authService.getCurrentUser()?.username;

        this.cartService.checkoutOneProduct({
          buyerUsername: username!,
          orderDetails: [
            {
              cartId: 0,
              productId: this.catalog.id,
              quantity: this.quantity,
              unitPrice: this.catalog.price * this.quantity
            } as DetailOrder
          ],
          totalProduct: 1,
          totalPrice: this.catalog.price * this.quantity
        } as CheckoutCart).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Checkout successfully',
              confirmButtonText: 'OK',
            }).then(() => {
              this.route.navigate(['transaction']);
            })
          }
        });
      }
    });
      
    }
  

  onAddToCart(){
    const username: string | null = this.checkUserAuthenticated();
    if(username){
      this.cartService.createCart({
        productId: this.catalog.id,
        buyerUsername: username,
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
}
