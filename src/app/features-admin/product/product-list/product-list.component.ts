import { Component, OnInit } from '@angular/core';
import { Product, ProductParams } from '../product.model';
import { ProductComponent } from './product/product.component';
import { ProductService } from '../product.service';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Pagination } from '../../../shared/models/response.model';
import { debounceTime, distinctUntilChanged, pairwise, startWith } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Pagination<Product> = {
    data: [],
    pageNumber: 0,
    pageSize: 0,
    totalRecords: 0,
    totalPages: 0
  } as Pagination<Product>;
  pageNumber: number = 1;
  totalPages: number = 0;
  formFilter = new FormGroup({
    productName: new FormControl<string>(''),
    categoryName: new FormControl<string>(''),
    // pageNumber: new FormControl<number>(1)
    // pageSize: new FormControl<number>(5),
  });

  constructor(private productService: ProductService){}
  
  ngOnInit(): void {
    this.loadProducts();

    this.formFilter.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    )
    .subscribe(() => {
      this.pageNumber = 1;
      this.loadProducts();
    });

    // this.formFilter.valueChanges
    // .pipe(
    //   startWith(this.formFilter.value),
    //   pairwise(),
    //   debounceTime(500),
    //   distinctUntilChanged(),
    // )
    // .subscribe(([prev, next]: [any, any]) => {
    //   console.log('prev', prev);
    //   console.log('next',next);
    //   if(this.formFilter.value.productName != prev.productName || this.formFilter.value.categoryName != prev.categoryName) {
    //     this.pageNumber = 1;
    //   }
    //   this.loadProducts();
    // } );
  }

  updatedList() {
    this.loadProducts();
  }

  private loadProducts() {
    this.productService.getAllProductsFiltered(
      {
        pageNumber: this.pageNumber,
        productName: this.formFilter.value.productName,
        categoryName: this.formFilter.value.categoryName
      } as ProductParams
    ).subscribe({
      next: products => {
        this.products = products.data;
        this.pageNumber = products.data.pageNumber;
        this.totalPages = products.data.totalPages;
      },
      error: err => {
        // this.isLoading = false;
        // this.errorMessage = err.message;
      },
    });
    // this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onPageChange(page: number){
    this.pageNumber = page;
    this.loadProducts();
    // this.formFilter.patchValue({pageNumber});
  }

}
