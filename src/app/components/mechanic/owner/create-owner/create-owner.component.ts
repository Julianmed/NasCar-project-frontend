import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-owner',
  templateUrl: './create-owner.component.html',
  styleUrls: ['./create-owner.component.scss']
})
export class CreateOwnerComponent implements OnInit {
  placas = [];
  addPlaca(newPlaca: string) {
    if (newPlaca) {
      this.placas.push(newPlaca);
    }
  }

  removePlaca(){
    var placas = this.placas;

    var indice = placas.indexOf(0); 
    placas.splice(indice, 1); 
    
  }

  constructor() { }

  ngOnInit(): void {
  }

}



