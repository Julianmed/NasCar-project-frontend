import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { VehicleService } from 'src/app/services/vehicle/vehicle.service';
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
    private router: Router
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
  }

  registerVehicle(values){
    console.log(this.formVehicle.value);
    this.vehicleService.createVehicle(this.formVehicle.value).subscribe(res => {
      console.log(res);
    });
    this.router.navigate(['tasks']);
  }

}
