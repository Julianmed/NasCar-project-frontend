import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeService } from '@app/services/employee/employee.service';
import { Subscription } from 'rxjs';
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
  photoEmployee:string;

  photos = [];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService
    ) { }

  ngOnInit(){
    this.sub = this.route.params.subscribe(params => {
      console.log(params);
      this.employeeId = params['id'];
      console.log(this.employeeId);
      this.employeeService.get(this.employeeId).subscribe((data: any) => {
        console.log(data);
        this.nameEmployee = data.fname;
        this.lnameEmployee = data.lname;
        this.rolEmployee = data.rol;
        this.emailEmployee = data.email;
        this.photoEmployee = data.photo;
        console.log(this.photoEmployee);
      })
    });
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
