import { Component, OnInit, ViewChild} from '@angular/core';
import { FormGroup } from '@angular/forms';

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

  titles = ['ID', 'Nombre', 'Descripción', 'Cantidad', 'Valor unitario', 'Valor total', 'Descartar'];
  id = 0;
  details: any = [];
  objectKeys = Object.keys;

  @ViewChild('name') inputName;
  @ViewChild('description') inputDescription;
  @ViewChild('lot') inputLot;
  @ViewChild('unitPrice') inputUnitPrice;

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
    this.id++;
    let detail = {
      id: this.id,
      name,
      description,
      lot,
      unitPrice,
      totalPrice: parseInt(lot)*parseInt(unitPrice)
    };
    this.details.push(detail);
    console.log("detalles ",this.details);
  }

  removeDetail(ref){
    let deleteElement;
    for(let key of Object.keys(this.details)){
      if(this.details[key].id == ref){
        deleteElement = key;
      }
    }
    this.details.splice(parseInt(deleteElement), 1);
  }

  clearFields() {
    this.inputName.nativeElement.value = '';
    this.inputDescription.nativeElement.value = '';
    this.inputLot.nativeElement.value = '';
    this.inputUnitPrice.nativeElement.value = '';
  }

  saveDetails(){

  }
}