import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { Router , ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@app/services/auth/auth.service';
import { OwnerService } from '@app/services/owner/owner.service';
import * as firebase from "firebase/app";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent  {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  public user$: Observable<any> = this.authSvc.afAuth.user;
  public email: String;

  constructor(
    private authSvc: AuthService, 
    private router: Router,
    private ownerSrv: OwnerService
  ) { }

  async onLogin() {
    const {email, password} = this.loginForm.value;
    try {
      const user = await this.authSvc.login(email, password);
      const currentUser = firebase.auth().currentUser;
      if (user && user.user.emailVerified){
        //Redirect to homepage
        this.email = currentUser.email;//----------------------------------------------
        localStorage.setItem('user',JSON.stringify([user]));
        this.router.navigate(['employee-profile']);
      }else if (user){
        this.router.navigate(['/verification-email']);
      }else {
        window.alert('Email o Password incorrecto')
      }
    }
    catch (error) {console.log(error)}
  }

  verifyOwner(){
    const dni = (<HTMLInputElement> document.getElementById('dni')).value;
    console.log("ID del empleado",dni);
    this.ownerSrv.verifyId(dni).subscribe((validate: boolean) => {
      if(validate){
        console.log(validate);
        this.ownerSrv.get(dni).subscribe((data: any) => {
          console.log(data);
          let email = data.email;
          let idOwner = data._id;
          console.log(email);
          console.log(idOwner);
          let token = this.ownerSrv.createToken(email);
          console.log("token", token);
          
        });
        //his.router.navigate(['state']);

        
      }
      else{
        alert("Documento de identidad no válido")
      }
    });
  }

}
