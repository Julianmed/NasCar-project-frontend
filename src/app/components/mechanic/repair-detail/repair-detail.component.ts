import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-repair-detail',
  templateUrl: './repair-detail.component.html',
  styleUrls: ['./repair-detail.component.scss']
})
export class RepairDetailComponent implements OnInit {
  brand = "";
  model = "";
  admissionDate = "";
  responsible = "";

  titles = ['Nombre', 'Descripción', 'Cantidad', 'Valor unitario', 'Valor total','Descartar'];
  details: any = [];
  objectKeys = Object.keys;

  constructor() { }

  ngOnInit(): void {
  }

  search(){
    let plateLicense = (<HTMLInputElement> document.getElementById('plate license')).value;
  }

  addDetail(){
    const name = (<HTMLInputElement> document.getElementById('name')).value;
    const lot = (<HTMLInputElement> document.getElementById('lot')).value;
    const unitPrice = (<HTMLInputElement> document.getElementById('unit price')).value;
    const description = (<HTMLInputElement> document.getElementById('description')).value;
    let detail = {
      name,
      description,
      lot,
      unitPrice,
      totalPrice: parseInt(lot)*parseInt(unitPrice),
      
    };
    this.details.push(detail);
    console.log("detalles ",this.details);
  }

  saveDetails(){

  }
}
