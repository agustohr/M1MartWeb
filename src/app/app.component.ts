import { Component, OnInit } from '@angular/core';
import { RouterLinkActive, RouterOutlet } from '@angular/router';
import { LayoutHeaderComponent } from './layout/customer/layout-header/layout-header.component';
import { LayoutFooterComponent } from "./layout/customer/layout-footer/layout-footer.component";
import { PageLayout } from './enum/page-layout';
import { PageLayoutService } from './layout/page-layout.service';
import { CustomerLayoutComponent } from "./layout/customer/customer-layout/customer-layout.component";
import { AdminLayoutComponent } from "./layout/admin/admin-layout/admin-layout.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LayoutHeaderComponent, RouterLinkActive, LayoutFooterComponent, CustomerLayoutComponent, AdminLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  readonly PageLayout = PageLayout;

  constructor(public pageLayoutService: PageLayoutService) {}
}
