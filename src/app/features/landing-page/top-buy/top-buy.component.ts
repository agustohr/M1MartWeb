import { Component, OnInit } from '@angular/core';
import { Catalog } from '../../catalog/catalog.model';
import { LandingPageService } from '../landing-page.service';
import { environment } from '../../../app.config';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-top-buy',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './top-buy.component.html',
  styleUrl: './top-buy.component.css'
})
export class TopBuyComponent implements OnInit {
  topBuyProducts: Catalog[] = [];
  
  constructor(private landingPageService: LandingPageService) { }
  
  ngOnInit(): void {
    this.landingPageService.getTopBuyCatalogs().subscribe((res) => {
      this.topBuyProducts = res.data;
      this.topBuyProducts.forEach(catalog => {
        catalog.imgSrc = `${environment.apiUrl}/product/${catalog.id}/product-image`;
      })
    })
  }
}
