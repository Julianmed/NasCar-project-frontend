import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '@app/services/employee/employee.service';
import { AuthService } from '@app/services/auth/auth.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {

  formCreateEmployee: FormGroup;
  profileStatus: string[] = ["inactive", "active"];
  roles: string[] = ['technician','HR assistant', 'Manager assistant'];

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private authSvc: AuthService
  ) {this.formCreateEmployee = this.formBuilder.group({
    _id: ['', Validators.required],
    userID: ['', Validators.required],
    user: ['', Validators.required],
    email: ['', Validators.compose([Validators.email, Validators.required])],
    fname: ['', Validators.required],
    lname: ['', Validators.required],
    cellphone: ['', Validators.required],
    landline: ['', Validators.required],
    role: ['', Validators.required],
    photo: ['', Validators.required],
    profileStatus: ['', Validators.required]
  })
}

  ngOnInit(): void {
    if(!this.authSvc.userAuthenticated()){
      this.router.navigate(['home']);
    }

  }

  registerEmployee(values){
    console.log(this.formCreateEmployee.value);
    this.employeeService.createEmployee(this.formCreateEmployee.value).subscribe(result => {
      console.log(result);
    });
    this.router.navigate(['manager/profile']);
  }

}
