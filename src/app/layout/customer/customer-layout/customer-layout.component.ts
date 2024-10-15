import { Component } from '@angular/core';
import { LayoutHeaderComponent } from "../layout-header/layout-header.component";
import { LayoutFooterComponent } from "../layout-footer/layout-footer.component";

@Component({
  selector: 'app-customer-layout',
  standalone: true,
  imports: [LayoutHeaderComponent, LayoutFooterComponent],
  templateUrl: './customer-layout.component.html',
  styleUrl: './customer-layout.component.css'
})
export class CustomerLayoutComponent {

}
