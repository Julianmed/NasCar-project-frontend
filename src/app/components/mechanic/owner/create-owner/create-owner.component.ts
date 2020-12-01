import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { OwnerService } from 'src/app/services/owner/owner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-owner',
  templateUrl: './create-owner.component.html',
  styleUrls: ['./create-owner.component.scss']
})
export class CreateOwnerComponent implements OnInit {

  formOwner: FormGroup
  placas = [];
  
  constructor(
    private formBuilder: FormBuilder,
    private ownerService: OwnerService,
    private router: Router
  ) {
    this.formOwner = this.formBuilder.group({
      _id: ['', Validators.required],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      cellphone: ['', Validators.required],
      landline: [''],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      vehicles: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  removePlaca(){
    var placas = this.placas;

    var indice = placas.indexOf(0); 
    placas.splice(indice, 1); 
    
  }

  addPlaca(newPlaca: string) {
    if (newPlaca) {
      this.placas.push(newPlaca);
    }
  }

  registerOwner(values){
    console.log(this.formOwner.value);
    this.ownerService.createUser(this.formOwner.value).subscribe(resultado => {
      console.log(resultado);      
    });
    this.router.navigate(['tasks']);
  }

}



