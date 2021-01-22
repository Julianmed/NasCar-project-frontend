import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VehicleService } from '@app/services/vehicle/vehicle.service';


@Component({
  selector: 'app-register-owner-vehicle',
  templateUrl: './register-owner-vehicle.component.html',
  styleUrls: ['./register-owner-vehicle.component.scss']
})
export class RegisterOwnerVehicleComponent implements OnInit {
  
  type:string[] = ["Moto", "Camión", "Automovil", "Camioneta"];
  formOwnerVehicle: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private vehicleService: VehicleService
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
  }

  registerOwnerVehicle(values){
    console.log('Entrando al registerOwnerVehicle');
  }

}
