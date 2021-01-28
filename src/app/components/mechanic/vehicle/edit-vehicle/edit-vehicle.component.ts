import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm} from '@angular/forms';
import { VehicleService } from '@app/services/vehicle/vehicle.service';
import { AuthService } from '@app/services/auth/auth.service';
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
    private authSvc: AuthService
  ) { }

  ngOnInit(){
    if(this.authSvc.userAuthenticated()){
      this.sub = this.activatedRoute.params.subscribe(params => {
        const id = params.placa;
        if(id) {
          this.vehicleService.get(id).subscribe((vehicle: any) =>{
            if(vehicle) {
              this.vehicle = vehicle;
              console.log("vehicle: ", vehicle)
            }else{
              console.log('vehicle no found.')
            }
          })
        }
      });
    }
    else{
      this.router.navigate(['home']);
    }
  }

  updateVehicle(form: NgForm){
    console.log("el vehicle es: ",form);
    this.vehicleService.updateVehicle(form, this.vehicle).subscribe(result =>{
      console.log(result);
    });
    this.router.navigate(['tasks']);
  }
}
