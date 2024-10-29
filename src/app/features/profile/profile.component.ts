import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { AuthService } from '../auth/auth.service';
import { Profile } from './profile.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  dataProfile: Profile = {} as Profile;
  
  constructor(private profileService: ProfileService, private authService: AuthService) { }
  ngOnInit(): void {
    const user = this.authService.getCurrentUser()?.username!;
    this.profileService.getUserByUsername(user).subscribe(res => {
      this.dataProfile = res.data;
    })
  }

}
