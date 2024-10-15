import { Component } from '@angular/core';
import { LayoutHeaderAdminComponent } from "../layout-header-admin/layout-header-admin.component";
import { LayoutSidebarAdminComponent } from "../layout-sidebar-admin/layout-sidebar-admin.component";

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [LayoutHeaderAdminComponent, LayoutSidebarAdminComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {

}
