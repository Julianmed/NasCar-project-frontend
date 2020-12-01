import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm} from '@angular/forms';
import { NgModule } from '@angular/core';
import { VehicleService } from 'src/app/services/vehicle/vehicle.service';
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
    private router: Router
  ) { }

  ngOnInit(){
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

  updateVehicle(form: NgForm){
    console.log("el vehicle es: ",form);
    this.vehicleService.updateVehicle(form).subscribe(result =>{
      console.log(result);
    });
    this.router.navigate(['tasks']);
  }
}
