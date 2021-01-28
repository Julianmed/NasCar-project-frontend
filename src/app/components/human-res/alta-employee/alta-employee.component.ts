import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '@app/services/employee/employee.service';
import { AuthService } from '@app/services/auth/auth.service';

@Component({
  selector: 'app-alta-employee',
  templateUrl: './alta-employee.component.html',
  styleUrls: ['./alta-employee.component.scss']
})
export class AltaEmployeeComponent implements OnInit {

  permit: string;
  permitOfEmployee: string[] = ['active', 'inactive'];
  permits: number; 
  employee: string;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private authSvc: AuthService
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
        else if(empleado.rol=='Manager assistant'){
          this.router.navigate(['manager/profile']);
        }
      });
    }
  }

  updateEmployeePermit(){
    this.permit = (<HTMLInputElement> document.getElementById('permit')).value;
    this.employeeService.updateProfileStatus(this.permit, this.employee).subscribe((data) => {
      console.log(data);
      alert(data.message);
    });
    
  }

  getModalEmployee(){
    console.log("Dar de alta al empleado");
    this.employee = (<HTMLInputElement> document.getElementById('employeeId')).value;
    console.log("ID empleado: ", this.employee);
    if(!this.employee) {
      alert("Por favor, ingrese un número de identificación valido.")
      this.permits = 0;
    }
    else{
      this.permits = 1;
      console.log("Entro al else");
    }
  }
  

}
