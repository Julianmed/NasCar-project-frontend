import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '@app/services/vehicle/vehicle.service';
import { AuthService } from '@app/services/auth/auth.service';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.scss']
})
export class QuotationComponent implements OnInit {
  sub: Subscription;
  detailsQuotation: string;
  placa: string;
  brand: string;
  color: string;
  model: string;
  type: string;
  admissionDate: Date;
  technician: string;
  details: any = [];
  objectKeys = Object.keys;


  titles = ['ID producto','Nombre', 'Descripción','Cantidad', 'Valor unitario', 'Valor total'];
  detailsId: number;
  detailsName: string;

  constructor( 
    private vehicleSrv: VehicleService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(){
    if(JSON.parse(localStorage.getItem('credential'))[0]){
      this.sub = this.route.params.subscribe((params) => {
        console.log(params);
        this.placa = params['placa'];
        this.vehicleSrv.get(this.placa).subscribe((data:any) =>{
          this.detailsQuotation = data.repairDetail;
          console.log(data);
          this.brand = data.brand;
          this.color = data.color;
          this.model = data.model;
          this.type = data.type;
          this.admissionDate = data.addmision.date;
          this.technician = data.addmision.registeredBy;
          this.details = data.repairDetail;
        })
      })
    }
    else{
      this.router.navigate(['home']);
    }
  }

  accept(){
    this.vehicleSrv.updateAuthorization("aceptado", this.placa).subscribe((respuesta:any)=>{
      alert("¡Gracias por aceptar la cotización!\n Desde este momento empezará el proceso de reparación de tu vehículo :)");
      this.router.navigate(['state']);
    });

  }

  reject(){
    this.vehicleSrv.updateAuthorization("rechazado", this.placa).subscribe((respuesta:any)=>{
      alert("¡Sentimos que rechazaras la cotización!\n Aún así esperamos que tengas un buen día :)");
      this.router.navigate(['state']);
    });
  }

}
