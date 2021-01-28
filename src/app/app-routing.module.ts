import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SendEmailComponent } from  './components/auth/send-email/send-email.component';
import { CreateOwnerComponent } from './components/mechanic/owner/create-owner/create-owner.component';
import { EditOwnerComponent } from './components/mechanic/owner/edit-owner/edit-owner.component';
import { CreateVehicleComponent } from './components/mechanic/vehicle/create-vehicle/create-vehicle.component';
import { EditVehicleComponent } from './components/mechanic/vehicle/edit-vehicle/edit-vehicle.component';
import { StateComponent } from './components/client/state/state.component';
import { QuotationComponent } from './components/client/quotation/quotation.component';
import { ProfileComponent } from './components/mechanic/profile/profile.component';
import { TasksComponent } from './components/mechanic/tasks/tasks.component';
import { RepairDetailComponent } from './components/mechanic/repair-detail/repair-detail.component';

import { RegisterOwnerVehicleComponent } from './components/mechanic/register-owner-vehicle/register-owner-vehicle.component';
import { AltaEmployeeComponent } from './components/human-res/alta-employee/alta-employee.component';
import { CreateEmployeeComponent } from './components/managerAssistant/create-employee/create-employee.component';
import { EditEmployeeProfileComponent } from './components/employee/edit-employee-profile/edit-employee-profile.component';
import { EmployeeProfileComponent } from './components/employee/profile/profile.component';
import { ProfileManagerComponent } from './components/managerAssistant/profile-manager/profile-manager.component';
import { ProfManagerHrComponent } from './components/human-res/prof-manager-hr/prof-manager-hr.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },

  { 
    path: 'home', 
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) 
  },

  { 
    path: 'login', 
    loadChildren: () => import('./components/auth/login/login.module').then(m => m.LoginModule) 
  }, 

  {
    path: 'verification-email',
    component: SendEmailComponent,
  },

  { 
    path: 'forgot-password',
     loadChildren: () => import('./components/auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) 
  },

  { 
    path: 'success',
     loadChildren: () => import('./components/success/success.module').then(m => m.SuccessModule)
  },
  
  {
    path:'state',
    component: StateComponent,
  },

  {
    path: 'quotation/:placa',
    component: QuotationComponent,
  },

  {
    path: 'profile',
    component: ProfileComponent,
  },

  {
    path: 'tasks',
    component: TasksComponent,
  },

  {
    path:'mechanic/owner/create',
    component: CreateOwnerComponent,
  },

  {
    path:'mechanic/owner/edit/:dni',
    component:EditOwnerComponent,    
  },

  {
    path:'mechanic/vehicle/create',
    component:CreateVehicleComponent,
  },

  {
    path:'mechanic/vehicle/edit/:placa',
    component:EditVehicleComponent,
  },
  
  {
    path:'mechanic/generate-detail',
    component:RepairDetailComponent,
  },
  {
    path: 'mechanic/register-owner-vehicle',
    component: RegisterOwnerVehicleComponent,
  },
  {
    path: 'human-res/alta-employee',
    component: AltaEmployeeComponent,
  },
  {
    path: 'manager/create-employee',
    component: CreateEmployeeComponent,
  },
  {
    path: 'employee-profile/:id', //debería recibir la id del perfil según el logging
    component: EmployeeProfileComponent,
  },
  {
    path: 'employee-profile/edit',
    component: EditEmployeeProfileComponent,
  },
  {
    path: 'manager/profile',
    component: ProfileManagerComponent,
  },
  {
    path: 'employee-profile/edit/:_id',
    component: EditEmployeeProfileComponent,
  },
  {
    path: 'human-res/profile',
    component: ProfManagerHrComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
