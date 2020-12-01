import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth/auth.service';
import { OwnerService } from '../../../services/owner/owner.service';
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
  private owrSrv: OwnerService;
  public email: String;

  constructor(
    private authSvc: AuthService, 
    private router: Router,
  ) { }

  async onGoogleLogin() {
    try{
      await this.authSvc.loginGoogle();
      var user = await firebase.auth().currentUser;
        if (user) {
          console.log(user);
          // User is signed in.
          this.email = user.email;//------------------------------------------------
          const hola = await (await user.getIdTokenResult( )).token;
          //const hola = await (await user.getIdTokenResult( )).claims;
          console.log("usuario", hola)
          this.router.navigate(['/success']);
        }
        else{
          this.router.navigate(['/login']);
        }
    }
    catch (error) {
      //console.log(error);
    }
  }

  /*async onFacebookLogin() {
    try {
      this.authSvc.loginFacebook();
      this.router.navigate(['/success']);
    }
    catch (error) {
      console.log(error);
    }
  }*/
  async onLogin() {
     const {email, password} = this.loginForm.value;
     try {
      const user = await this.authSvc.login(email, password);
      const currentUser = firebase.auth().currentUser;
      if (user && user.user.emailVerified){
        //Redirect to homepage
        this.email = currentUser.email;//----------------------------------------------
        this.router.navigate(['/profile']);
      }else if (user){
        this.router.navigate(['/verification-email']);
      }else {
        //this.router.navigate(['/register']);
        window.alert('Email o Password incorrecto')
      }
     }
     catch (error) {console.log(error)} 
     
  }

}
