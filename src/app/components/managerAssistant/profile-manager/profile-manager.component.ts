import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';

@Component({
  selector: 'app-profile-manager',
  templateUrl: './profile-manager.component.html',
  styleUrls: ['./profile-manager.component.scss']
})
export class ProfileManagerComponent implements OnInit {

  constructor(
    private authSvc: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(!this.authSvc.userAuthenticated()){
      this.router.navigate(['home']);
    }
  }
}
