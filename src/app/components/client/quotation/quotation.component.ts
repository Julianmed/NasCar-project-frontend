import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../../services/vehicle/vehicle.service';


@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.scss']
})
export class QuotationComponent implements OnInit {
  sub: Subscription;
  detailsQuotation: string;
  placa: string;

  constructor( 
    private vehicleSrv: VehicleService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(){
    this.sub = this.route.params.subscribe(params => {
      console.log(params);
      this.placa = params['placa'];
      this.vehicleSrv.get(this.placa).subscribe((data:any) =>{
        this.detailsQuotation = data.repairDetail;
      })
    });
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
