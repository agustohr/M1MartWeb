import { Component, OnInit } from '@angular/core';
import { Catalog } from '../../catalog/catalog.model';
import { LandingPageService } from '../landing-page.service';
import { environment } from '../../../app.config';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-news-product',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './news-product.component.html',
  styleUrl: './news-product.component.css'
})
export class NewsProductComponent implements OnInit {
  newestProducts: Catalog[] = [];
  constructor(private landingPageService: LandingPageService) { }
  ngOnInit(): void {
    this.landingPageService.getNewestCatalogs().subscribe((res) => {
      this.newestProducts = res.data;
      this.newestProducts.forEach(catalog => {
        catalog.imgSrc = `${environment.apiUrl}/product/${catalog.id}/product-image`;
      })
    })
  }

}
