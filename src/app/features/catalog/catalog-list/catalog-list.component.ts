import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogService } from '../catalog.service';
import { Catalog } from '../catalog.model';
import { environment } from '../../../app.config';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-catalog-list',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './catalog-list.component.html',
  styleUrl: './catalog-list.component.css'
})
export class CatalogListComponent implements OnInit {
  catalogs: {data: Catalog, imgSrc: string}[] = [];

  constructor(private catalogService: CatalogService) { }
  ngOnInit(): void {
    this.getCatalogs();
  }

  private getCatalogs() {
    this.catalogService
      .getAllCatalogs()
      .subscribe((res) => {
        this.catalogs = res.data.map((catalog) => {
          return {
            data: catalog,
            imgSrc: `${environment.apiUrl}/product/${catalog.id}/product-image`,
          };
        });
      });
  }

  // get imgSrc() {
  //   return `${environment.apiUrl}/product/${this.product.id}/product-image`;
  // }
  
}
