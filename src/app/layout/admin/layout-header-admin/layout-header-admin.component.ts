import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../features/auth/auth.service';

@Component({
  selector: 'app-layout-header-admin',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './layout-header-admin.component.html',
  styleUrl: './layout-header-admin.component.css'
})
export class LayoutHeaderAdminComponent implements OnInit{
  userIcon = faUser;
  signOutIcon = faRightFromBracket;
  username: string | undefined; 

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.username = this.authService.getCurrentUser()?.username;
  }

  onSignOut(){
    this.authService.logout();
  }
}
