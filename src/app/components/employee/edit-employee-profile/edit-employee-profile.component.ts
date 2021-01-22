import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '@app/services/employee/employee.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-employee-profile',
  templateUrl: './edit-employee-profile.component.html',
  styleUrls: ['./edit-employee-profile.component.scss']
})
export class EditEmployeeProfileComponent implements OnInit {

  sub: Subscription;
  employee: any = {}

  constructor(private employeeService: EmployeeService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      const id = params._id;
      if(id){
        this.employeeService.get(id).subscribe((employee: any) => {
          if(employee){
            this.employee = employee;
            console.log("Employee:", employee)
          }else{
            console.log("Employee not found")
          }
        })
      }
    });
  }

  updateEmployeeForm(form: NgForm) {
    console.log("El empleado es: ", form);
    this.employeeService.updateEmployee(form).subscribe(res => {
      console.log(res);
    });
    this.router.navigate(['employee-profile'])
  }

}