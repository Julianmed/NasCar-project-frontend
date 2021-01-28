import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm} from '@angular/forms';
import { OwnerService } from 'src/app/services/owner/owner.service';
import { AuthService } from '@app/services/auth/auth.service';
import { EmployeeService } from '@app/services/employee/employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-owner',
  templateUrl: './edit-owner.component.html',
  styleUrls: ['./edit-owner.component.scss']
})
export class EditOwnerComponent implements OnInit {
  sub: Subscription;
  owner: any = {}

  constructor(
    private ownerService: OwnerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authSvc: AuthService,
    private employeeService: EmployeeService
    
  ) {}

  ngOnInit(){
    if(this.authSvc.userAuthenticated()){
      const user = JSON.parse(localStorage.getItem('user'))[0];
      this.employeeService.getRol(user.user.uid).subscribe((empleado:any)=>{
        if(empleado.rol=='Manager assistant'){
          this.router.navigate(['manager/profile']);
        }
        else if(empleado.rol=='HR assistant'){
          this.router.navigate(['human-res/profile']);
        }
        else{
          this.sub = this.activatedRoute.params.subscribe(params => {
            const id = params.dni;
            if(id) {
              this.ownerService.get(id).subscribe((owner: any) =>{
                if(owner) {
                  this.owner = owner;
                }else{
                  console.log('Owner no found.')
                }
              })
            }
          });
        }
      });
    }
    else{
      this.router.navigate(['home']);
    }
  }

  updateVehicle(form: NgForm){
    console.log("el owner es: ",form);
    this.ownerService.update(form).subscribe(result =>{
      console.log(result);
    });
    this.router.navigate(['tasks']);
  }
}
