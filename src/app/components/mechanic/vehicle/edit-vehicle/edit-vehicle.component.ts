import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm} from '@angular/forms';
import { VehicleService } from '@app/services/vehicle/vehicle.service';
import { AuthService } from '@app/services/auth/auth.service';
import { EmployeeService } from '@app/services/employee/employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.scss']
})
export class EditVehicleComponent implements OnInit {
  sub: Subscription;
  vehicle: any = {}
  
  constructor(
    private vehicleService: VehicleService, 
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private authSvc: AuthService,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(){
    if(this.authSvc.userAuthenticated()){
      const user = JSON.parse(localStorage.getItem('user'))[0];
      this.employeeService.getRol(user.user.uid).subscribe((empleado:any)=>{
        if(empleado.rol=='Manager assistant'){
          this.router.navigate(['manager/profile']);
        }
        else if(empleado.rol=='HR assistant'){
          this.router.navigate(['human-res/profile']);
        }
        else{
          this.sub = this.activatedRoute.params.subscribe(params => {
            const id = params.placa;
            if(id) {
              this.vehicleService.get(id).subscribe((vehicle: any) =>{
                if(vehicle) {
                  this.vehicle = vehicle;
                }else{
                  console.log('vehicle no found.')
                }
              })
            }
          });
        }
      });
    }
    else{
      this.router.navigate(['home']);
    }
  }

  updateVehicle(form: NgForm){
    this.vehicleService.updateVehicle(form, this.vehicle).subscribe(result =>{
      console.log(result);
    });
    this.router.navigate(['employee-profile']);
  }
}
