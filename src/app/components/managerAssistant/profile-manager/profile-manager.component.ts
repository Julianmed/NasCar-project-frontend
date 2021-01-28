import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';
import { EmployeeService } from '@app/services/employee/employee.service';

@Component({
  selector: 'app-profile-manager',
  templateUrl: './profile-manager.component.html',
  styleUrls: ['./profile-manager.component.scss']
})
export class ProfileManagerComponent implements OnInit {

  constructor(
    private authSvc: AuthService,
    private router: Router,
    private employeeService:EmployeeService
  ) { }

  ngOnInit(): void {
    if(!this.authSvc.userAuthenticated()){
      this.router.navigate(['home']);
    }
    else{
      const user = JSON.parse(localStorage.getItem('user'))[0];
      this.employeeService.getRol(user.user.uid).subscribe((empleado:any)=>{
        if(empleado.rol=='technician'){
          this.router.navigate(['tasks/'+empleado._id]);
        }
        else if(empleado.rol=='HR assistant'){
          this.router.navigate(['human-res/profile']);
        }
      });
    }
  }
}
