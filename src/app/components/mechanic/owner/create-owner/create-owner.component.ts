import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { OwnerService } from 'src/app/services/owner/owner.service';
import { AuthService } from '@app/services/auth/auth.service';
import { EmployeeService } from '@app/services/employee/employee.service';
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
    private router: Router,
    private authSvc: AuthService,
    private employeeService:EmployeeService
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
    if(!this.authSvc.userAuthenticated()){
      this.router.navigate(['home'])
    }
    else{
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



