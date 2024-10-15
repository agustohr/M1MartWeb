import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-layout-sidebar-admin',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './layout-sidebar-admin.component.html',
  styleUrl: './layout-sidebar-admin.component.css'
})
export class LayoutSidebarAdminComponent {

}
