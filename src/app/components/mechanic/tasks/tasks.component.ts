import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../../services/vehicle/vehicle.service';
import { OwnerService } from '../../../services/owner/owner.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  state: string;
  stateOfVehicle: string[] = ['diagnosticando', 'reparando', 'listo'];
  status = 1;
  constructor(
    private vehicleSrv:VehicleService, 
    private router: Router,
    private route: ActivatedRoute,
    private ownerSrv: OwnerService
  ) { }

  ngOnInit(): void {
  }

  editeOwner(){
    const dni = (<HTMLInputElement> document.getElementById('dni')).value;
    if(!dni){
      alert("Para editar un propietario es necesario que ingrese un documento de identidad.")
    }
    else{
      console.log("dni",dni)
      this.ownerSrv.verifyId(dni).subscribe((validate: boolean)=>{
        if(validate){
          this.router.navigate(['mechanic/owner/edit/'+dni]);
        }
        else{
          alert("El número de identificación ingresado no existe en el sistema")
        }
      });
    };
  };

  editeVehicle(){
    const placa = (<HTMLInputElement> document.getElementById('placa')).value;
    if(!placa){
      alert("Para editar un vehículo es necesario que ingrese una placa.")
    }
    else{
      console.log("placa",placa)
      this.vehicleSrv.verifyPlaca(placa).subscribe((validate: boolean)=>{
        if(validate){
          this.router.navigate(['mechanic/vehicle/edit/'+placa]);
        }
        else{
          alert("El número de la placa ingresado no existe en el sistema")
        }
      });
    };
  }

  updateVehicleStatus(){
    const state = (<HTMLInputElement> document.getElementById('state')).value;
    console.log("state ",state)
  }

}
