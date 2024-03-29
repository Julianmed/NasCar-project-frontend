import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VehicleService } from '@app/services/vehicle/vehicle.service';
import { AuthService } from '@app/services/auth/auth.service';
import { OwnerService } from '@app/services/owner/owner.service';
import { EmployeeService } from '@app/services/employee/employee.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register-owner-vehicle',
  templateUrl: './register-owner-vehicle.component.html',
  styleUrls: ['./register-owner-vehicle.component.scss']
})
export class RegisterOwnerVehicleComponent implements OnInit {
  
  sub: Subscription;
  type:string[] = ["moto", "camión", "automovil", "camioneta"];
  formOwnerVehicle: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private ownerService: OwnerService,
    private vehicleService: VehicleService,
    private authSvc: AuthService,
    private employeeService: EmployeeService
  ) {
    this.formOwnerVehicle = this.formBuilder.group({
      _id:['', Validators.required],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      cellphone: ['', Validators.required],
      landline: ['', Validators.required],
      email: ['', Validators.required],
      placa: ['', Validators.required],
      type: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      color: ['', Validators.required],
      repairDetails: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    if(this.authSvc.userAuthenticated()){
      const user = JSON.parse(localStorage.getItem('user'))[0];
      this.employeeService.getRol(user.user.uid).subscribe((empleado:any)=>{
        if(empleado.rol=='Manager assistant'){
          this.router.navigate(['manager/profile']);
        }
        else if(empleado.rol=='HR assistant'){
          this.router.navigate(['human-res/profile']);
        }
      });
    }
    else{
      this.router.navigate(['home']);
    }
  }

  registerOwnerVehicle(){
    console.log(this.formOwnerVehicle.value);
    let clientForm = {
      _id: this.formOwnerVehicle.value._id,
      fname: this.formOwnerVehicle.value.fname,
      lname: this.formOwnerVehicle.value.lname,
      cellphone: this.formOwnerVehicle.value.cellphone,
      landline: this.formOwnerVehicle.value.landline,
      email: this.formOwnerVehicle.value.email,
      vehicles: this.formOwnerVehicle.value.placa,
    }
    this.formOwnerVehicle.value.fname;
    this.ownerService.createUser(clientForm).subscribe(result => {
      console.log(result);
    });
    console.log(this.formOwnerVehicle.value);
    let vehicleForm = {
      _id: this.formOwnerVehicle.value.placa,
      type: this.formOwnerVehicle.value.type,
      brand: this.formOwnerVehicle.value.brand,
      model: this.formOwnerVehicle.value.model,
      color: this.formOwnerVehicle.value.color
    }
    this.formOwnerVehicle.value.fname;
    this.vehicleService.createVehicle(vehicleForm).subscribe(result => {
      console.log(result);
    });
    this.router.navigate(['/employee-profile'])
  }
}
