import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CartUser, CheckoutCart, DetailOrder } from './cart.model';
import { CartService } from './cart.service';
import { environment } from '../../app.config';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, FontAwesomeModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  carts: CartUser[] = [];
  total: number = 0;
  isCheckedAll: boolean = false;
  removeIcon = faTrash;
  router = inject(Router);

  constructor(private cartService: CartService, private authService: AuthService){}
  ngOnInit(): void {
    this.getCarts();
  }

  private getCarts(){
    this.cartService.getCartsByUsername().subscribe((res) => {
      this.carts = res.data;
      this.carts.forEach(cart => {
        cart.image = `${environment.apiUrl}/Product/${cart.product.productId}/product-image`
      });
    });
  }

  change(index: any) {
    this.carts[index].checked = !this.carts[index].checked;
    if(this.carts[index].checked) {
      this.total += this.carts[index].product.price * this.carts[index].quantity;
    } else{
      this.total -= this.carts[index].product.price * this.carts[index].quantity;
    }

    if(this.carts.every(cart => cart.checked)) {
      this.isCheckedAll = true;
    } else{
      this.isCheckedAll = false;
    }
  }

  checkedAll(){
    this.isCheckedAll = !this.isCheckedAll;
    if(this.isCheckedAll) {
      this.carts.forEach(cart => {
        cart.checked = true;
      })
      this.total = this.carts.reduce((a, b) => a + (b.product.price * b.quantity), 0);
    } else{
      this.carts.forEach(cart => {
        cart.checked = false;
      })
      this.total = 0;
    }

  }

  removeAll() {
    this.cartService.deleteCartByUsername().subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Removed',
          text: 'All products removed from cart',
          confirmButtonText: 'OK',
        }).then(() => {
          this.getCarts();
        })
      }
    })
  }

  removeItem(id: number) {
    this.cartService.deleteCart(id).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Removed',
          text: 'Product removed from cart',
          confirmButtonText: 'OK',
        }).then(() => {
          this.getCarts();
        })
      }
    })
  }

  checkout() {
    Swal.fire({
      title: "Are you sure \nCheckout this cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, checkout it!"
    }).then((result) => {
      if (result.isConfirmed) {
        const username = this.authService.getCurrentUser()?.username;
        const details: DetailOrder[] = [];
        details.push(...this.carts.filter(cart => cart.checked).map(cart => {
          return {
            cartId: cart.id,
            productId: cart.product.productId,
            quantity: cart.quantity,
            unitPrice: cart.product.price * cart.quantity
          } as DetailOrder
        }))

        this.cartService.checkoutCart({
          buyerUsername: username!,
          orderDetails: details,
          totalProduct: this.carts.filter(cart => cart.checked).length,
          totalPrice: this.total
        } as CheckoutCart).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Checkout successfully',
              confirmButtonText: 'OK',
            }).then(() => {
              this.router.navigate(['transaction']);
            })
          }
        });
      }
    });
  }
}
