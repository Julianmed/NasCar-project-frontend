import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-vehicle',
  templateUrl: './create-vehicle.component.html',
  styleUrls: ['./create-vehicle.component.scss']
})
export class CreateVehicleComponent implements OnInit {

  typeOfVehicle: string[] = ["moto", "camion", "automovil", "camioneta"];

  constructor() { }

  ngOnInit(): void {
  }

}
