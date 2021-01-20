import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule} from '@angular/fire';

import { SendEmailComponent } from './components/auth/send-email/send-email.component';
import { CreateOwnerComponent } from './components/mechanic/owner/create-owner/create-owner.component';
import { EditOwnerComponent } from './components/mechanic/owner/edit-owner/edit-owner.component';
import { CreateVehicleComponent } from './components/mechanic/vehicle/create-vehicle/create-vehicle.component';
import { EditVehicleComponent } from './components/mechanic/vehicle/edit-vehicle/edit-vehicle.component';
import { StateComponent } from './components/client/state/state.component';
import { QuotationComponent } from './components/client/quotation/quotation.component';
import { ProfileComponent } from './components/mechanic/profile/profile.component';
import { TasksComponent } from './components/mechanic/tasks/tasks.component';
import { CreateEmployeeComponent } from './components/managerAssistant/employee/create-employee/create-employee.component';
import { EditEmployeeComponent } from './components/managerAssistant/employee/edit-employee/edit-employee.component';
import { RegisterOwnerVehicleComponent } from './components/mechanic/register-owner-vehicle/register-owner-vehicle.component';
import { CommonModule } from '@angular/common';
import { AltaEmployeeComponent } from './components/human-res/alta-employee/alta-employee.component';
import { EditEmployeeProfileComponent } from './components/employee/edit-employee-profile/edit-employee-profile.component';
import { EmployeeProfileComponent } from './components/employee/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SendEmailComponent,
    CreateOwnerComponent,
    EditOwnerComponent,
    CreateVehicleComponent,
    EditVehicleComponent,
    StateComponent,
    QuotationComponent,
    ProfileComponent,
    TasksComponent,
    CreateEmployeeComponent,
    EditEmployeeComponent,
    RegisterOwnerVehicleComponent,
    AltaEmployeeComponent,
    EditEmployeeProfileComponent,
    EmployeeProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
