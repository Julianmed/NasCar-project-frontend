import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { VehicleService } from 'src/app/services/vehicle/vehicle.service';
import { AuthService } from '@app/services/auth/auth.service';
import { EmployeeService } from '@app/services/employee/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-vehicle',
  templateUrl: './create-vehicle.component.html',
  styleUrls: ['./create-vehicle.component.scss']
})
export class CreateVehicleComponent implements OnInit {

  formVehicle: FormGroup;
  type: string[] = ["moto", "camion", "automovil", "camioneta"];

  constructor(
    private formBuilder: FormBuilder,
    private vehicleService: VehicleService,
    private router: Router,
    private authSvc: AuthService,
    private employeeService: EmployeeService
  ) { 
    this.formVehicle = this.formBuilder.group({
      _id: ['', Validators.required],
      type: ['', Validators.required],
      owners: ['', Validators.required],
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

  registerVehicle(){
    console.log(this.formVehicle.value);
    this.vehicleService.createVehicle(this.formVehicle.value).subscribe(res => {
      console.log(res);
    });
    this.router.navigate(['tasks']);
  }

}
