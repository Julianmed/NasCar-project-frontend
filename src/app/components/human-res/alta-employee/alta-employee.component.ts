import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '@app/services/employee/employee.service';

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
  ) { }

  ngOnInit(): void {
  }

  updateEmployeePermit(){
    this.permit = (<HTMLInputElement> document.getElementById('permit')).value;
    console.log("Estado del profileStatus de " + this.employee + " es " + this.permit);
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
