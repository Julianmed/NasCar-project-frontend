import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleService } from '@app/services/vehicle/vehicle.service';
import { AuthService } from '@app/services/auth/auth.service';
import { OwnerService } from '@app/services/owner/owner.service';
import { EmployeeService } from '@app/services/employee/employee.service';

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
    private ownerSrv: OwnerService,
    private authSvc: AuthService,
    private employeeService: EmployeeService
  ) { }

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

  editeOwner(){
    const dni = (<HTMLInputElement> document.getElementById('dni')).value;
    if(!dni){
      alert("Para editar un propietario es necesario que ingrese un documento de identidad.")
    }
    else{
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
    this.vehicleSrv.updateStatus(this.state, this.placa).subscribe((data)=>{
      alert(data);
    });
  }

  getModal(){
    this.placa = (<HTMLInputElement> document.getElementById('placaId')).value;
    if(!this.placa){
      alert("ingrese una placa válida por favor")
      this.status = 0;
    }
    else{
      this.status = 1;
    }
  }
}
