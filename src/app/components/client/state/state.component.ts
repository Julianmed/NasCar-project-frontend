import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '@app/services/vehicle/vehicle.service';
import { AuthService } from '@app/services/auth/auth.service';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit {
  vehicleState: string;
  authorization: string;
  placa: string;
  token: string;
  headers = new HttpHeaders();

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private vehicleSrv: VehicleService,
    private authSvc: AuthService
  ) { 
      this.headers.append("Content-Type", "application/json");
      this.headers.append("Authorization", "Bearer " + this.token);
    }

  ngOnInit(){
    this.route.params.subscribe(params => {
      if(params.token){
        this.token = params.token;
        localStorage.setItem('credential',JSON.stringify([this.token]));
      }
    });
  }

  getData() {
    this.placa = (<HTMLInputElement> document.getElementById('placa')).value;
    console.log("Placa: ", this.placa);
    this.vehicleSrv.getAny(this.placa).subscribe((data: any) =>{
      this.vehicleState = data.estado;
      this.authorization = data.cotizacion;
      console.log(data.cotizacion);
      this.router.navigate(['state']);
    });
  }

}