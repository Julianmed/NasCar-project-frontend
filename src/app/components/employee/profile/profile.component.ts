import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeService } from '@app/services/employee/employee.service';
import { Subscription } from 'rxjs';
import { AuthService } from '@app/services/auth/auth.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class EmployeeProfileComponent implements OnInit {

  sub: Subscription;
  detailsEmployee: string;
  employeeId: string;
  nameEmployee:string;
  lnameEmployee:string;
  rolEmployee:string;
  emailEmployee:string;
  file: File;
  photoSelected: ArrayBuffer | string;
  photoEmployee: ArrayBuffer | string;
  rol: any;
  photos = [];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private authSvc: AuthService
    ) { }

  ngOnInit(){
    if(this.authSvc.userAuthenticated()){
      this.employeeService.getRol(JSON.parse(localStorage.getItem('user'))[0].user.uid).subscribe((empleado: any) => {
        this.rol = empleado.rol;
        console.log(empleado.rol);
        this.nameEmployee = empleado.fname;
        this.lnameEmployee = empleado.lname;
        this.rolEmployee = empleado.rol;
        this.emailEmployee = empleado.email;
        this.photoEmployee = empleado.photo;
      })
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
    this.employeeService.updatePhoto(this.file, this.employeeId)
      .subscribe((data) =>{
        console.log(data);
        if(typeof data.message == null || data.message == undefined){
          alert("Se ha actualizado la foto de perfil.");
        }else{          
          alert(data.message);
        }
      });
    
  }

}
