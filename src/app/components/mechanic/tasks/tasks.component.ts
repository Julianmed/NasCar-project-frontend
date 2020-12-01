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
  status: number;
  placa: string;

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
    this.placa = (<HTMLInputElement> document.getElementById('placa')).value;
    if(!this.placa){
      alert("Para editar un vehículo es necesario que ingrese una placa.")
    }
    else{
      console.log("placa",this.placa)
      this.vehicleSrv.verifyPlaca(this.placa).subscribe((validate: boolean)=>{
        if(validate){
          this.router.navigate(['mechanic/vehicle/edit/'+this.placa]);
        }
        else{
          alert("El número de la placa ingresado no existe en el sistema")
        }
      });
    };
  }

  updateVehicleStatus(){
    this.state = (<HTMLInputElement> document.getElementById('state')).value;
    console.log("state: ",this.state)
    this.vehicleSrv.updateStatus(this.state, this.placa).subscribe((data)=>{
      alert(data);
    });
  }

  getModal(){
    this.placa = (<HTMLInputElement> document.getElementById('placaId')).value;
    console.log("placa: ",this.placa)
    if(!this.placa){
      alert("ingrese una placa válida por favor")
      this.status = 0;
    }
    else{
      this.status = 1;
    }
  }
}
