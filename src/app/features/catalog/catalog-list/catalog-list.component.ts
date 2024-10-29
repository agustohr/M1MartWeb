import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogService } from '../catalog.service';
import { Catalog } from '../catalog.model';
import { environment } from '../../../app.config';
import { CurrencyPipe } from '@angular/common';
import { CategoryService } from '../../../features-admin/category/category.service';
import { Category } from '../../../features-admin/category/category.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductParams } from '../../../features-admin/product/product.model';
import { Pagination } from '../../../shared/models/response.model';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-catalog-list',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, ReactiveFormsModule],
  templateUrl: './catalog-list.component.html',
  styleUrl: './catalog-list.component.css'
})
export class CatalogListComponent implements OnInit {
  catalogs: Pagination<Catalog> = {
    data: [],
    pageNumber: 0,
    pageSize: 0,
    totalRecords: 0,
    totalPages: 0
  } as Pagination<Catalog>;
  // catalogs: Catalog[] = [];
  categorySelectOptions: Category[] = [];
  formFilter: FormGroup = new FormGroup({
    productName: new FormControl<string>(''),
    categoryName: new FormControl<string>(''),
  });
  pageNumber: number = 1;

  constructor(private catalogService: CatalogService, private categoryService: CategoryService) { }
  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categorySelectOptions = categories.data;
      }
    });
    
    this.getCatalogs();

    this.formFilter.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    )
    .subscribe(() => {
      this.pageNumber = 1;
      this.getCatalogs();
    });
  }

  private getCatalogs() {
    this.catalogService
      .getAllCatalogsFiltered(
        {
          pageNumber: this.pageNumber,
          productName: this.formFilter.value.productName,
          categoryName: this.formFilter.value.categoryName
        } as ProductParams
      )
      .subscribe((res) => {
        this.catalogs = res.data;

        this.catalogs.data.forEach(catalog => {
          catalog.imgSrc = `${environment.apiUrl}/product/${catalog.id}/product-image`;
        })
        // this.catalogs = res.data.map((catalog) => {
        //   return {
        //     data: catalog,
        //     imgSrc: `${environment.apiUrl}/product/${catalog.id}/product-image`,
        //   };
        // });
      });
  }

  onPageChange(page: number){
    this.pageNumber = page;
    this.getCatalogs();
  }
  
}
