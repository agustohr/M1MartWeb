import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faRightFromBracket, faRightToBracket, faCartShopping, faHouse, faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../features/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout-header',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule, CommonModule],
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.css']
})
export class LayoutHeaderComponent implements OnInit {
  // username: string | undefined;
  isProfileClicked = false;
  userIcon = faUser;
  signOutIcon = faRightFromBracket;
  signInIcon = faRightToBracket;
  cartIcon = faCartShopping;
  homeIcon = faHouse;
  historyIcon = faClockRotateLeft;
  isAuth!: boolean;


  // constructor(private authService: AuthService) {}
  authService = inject(AuthService);

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  ngOnInit(): void {
    this.isAuth = this.authService.isLoggedIn();
    // this.username = this.authService.getCurrentUser()?.username;

    // this.authService.isAuthenticated$.subscribe((result) => {
    //   this.isAuth = result;
    // });

    // this.authService.currentUser$.subscribe((user) => {
    //   this.username = user?.username;
    // });
  }

  onSignOut(){
    this.authService.logout();
  }
}
