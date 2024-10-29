import { Component } from '@angular/core';
import { TopBuyComponent } from "./top-buy/top-buy.component";
import { NewsProductComponent } from "./news-product/news-product.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [TopBuyComponent, NewsProductComponent, RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}
