import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '@app/services/employee/employee.service';
import { Subscription } from 'rxjs';
import { AuthService } from '@app/services/auth/auth.service';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-edit-employee-profile',
  templateUrl: './edit-employee-profile.component.html',
  styleUrls: ['./edit-employee-profile.component.scss']
})
export class EditEmployeeProfileComponent implements OnInit {

  sub: Subscription;
  employee: any = {}
  file: File;
  employeeId: string;
  photoSelected: ArrayBuffer | string;
  photoEmployee: ArrayBuffer | string;
  fname: string;
  lname:string;
  cellphone:string;
  landline:string;
  photo: File;

  constructor(private employeeService: EmployeeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authSvc: AuthService
    ) { }

  ngOnInit(): void {
    if(this.authSvc.userAuthenticated()){
      this.sub = this.activatedRoute.params.subscribe(params => {
        const id = params._id;
        if(id){
          this.employeeService.get(id).subscribe((employee: any) => {
            if(employee){
              this.employee = employee;
              this.employeeId = employee._id;
              this.fname = employee.fname;
              this.lname = employee.lname;
              this.cellphone = employee.cellphone;
              this.landline = employee.landline;
              console.log("Employee:", employee)
            }else{
              this.fname = 'Not';
              this.lname = 'Found employee'
              console.log("Employee not found")
            }
          })
        }
      });
    }
    else{
      this.router.navigate(['home']);
    }
  }

  onPhotoSelected(event: HtmlInputEvent):void {
    if(event.target.files && event.target.files[0]){
      //Archivo a subir
      this.file = <File>event.target.files[0];
      //Image preview
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  uploadPhoto(){
    if(this.file){
      this.employeeService.updatePhoto(this.file, this.employeeId)
      .subscribe((data) =>{
        console.log("DATA",data);
        if(typeof data.message == null || data.message == undefined){
          alert("Se ha actualizado la foto de perfil.");
          this.router.navigate(['/employee-profile/'+ this.employeeId]);
        }else{          
          alert(data.message);
        }
      });    
    }else{
      alert("No ha realizado ninguna actualizado");
      this.router.navigate(['/employee-profile/'+ this.employeeId]);
    }
    
  }

  uploadProfile(){
    let landline = (<HTMLInputElement> document.getElementById('landline')).value;
    let fname = (<HTMLInputElement> document.getElementById('fname')).value;
    let lname = (<HTMLInputElement> document.getElementById('lname')).value;
    let cellphone = (<HTMLInputElement> document.getElementById('cellphone')).value;
    let photoEmployee = (<HTMLInputElement> document.getElementById('photo'));
    let photo = photoEmployee.files[0];

    if(photo && this.employee){
      this.employeeService.updatePhoto(photo, this.employeeId).subscribe((result)=>{
        console.log(result);
        if(typeof result.message == null || result.message == undefined){
          alert("Se ha actualizado la foto de perfil.");
        }else{          
          alert(result.message);
        }
      });
      this.employeeService.updateEmployee(fname, lname, cellphone, landline, this.employeeId)
        .subscribe((data) =>{
          console.log(data);
          if(typeof data.message == null || data.message == undefined){
            alert("Se ha actualizado el perfil con exito.");
          }else{          
            alert(data.message);
          }
        }); 
      this.router.navigate(['/employee-profile/'+ this.employeeId]);     
    }else if(!photo){
      this.employeeService.updateEmployee(fname, lname, cellphone, landline, this.employeeId)
        .subscribe((data) =>{
          console.log(data);
          if(typeof data.message == null || data.message == undefined){
            alert("Se ha actualizado el perfil con exito.");
          }else{          
            alert(data.message);
            this.router.navigate(['/employee-profile/'+ this.employeeId]);
          }
        }); 
    }else{
      alert("No ha realizado ninguna actualizado");
      this.router.navigate(['/employee-profile/'+ this.employeeId]);
    }
  }

}