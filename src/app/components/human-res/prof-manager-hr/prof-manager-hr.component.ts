import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '@app/services/employee/employee.service';
import { AuthService } from '@app/services/auth/auth.service';

@Component({
  selector: 'app-prof-manager-hr',
  templateUrl: './prof-manager-hr.component.html',
  styleUrls: ['./prof-manager-hr.component.scss']
})
export class ProfManagerHrComponent implements OnInit {

  constructor(
    private authSvc: AuthService,
    private router: Router,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    if(!this.authSvc.userAuthenticated()){
      this.router.navigate(['home']);
    }
    else{
      const user = JSON.parse(localStorage.getItem('user'))[0];
      this.employeeService.getRol(user.user.uid).subscribe((empleado:any)=>{
        console.log("empleado: ",empleado.rol);
        if(empleado.rol=='technician'){
          this.router.navigate(['tasks/'+empleado._id]);
        }
        else if(empleado.rol=='Manager assistant'){
          this.router.navigate(['manager/profile']);
        }
      });
    }
  }

}
