import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {RegisterComponent} from "./register/register.component";
import {RecuperaPasswordComponent} from "./login/login-form/recupera-password/recupera-password.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'recupera-password', component: RecuperaPasswordComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
