import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {RegisterComponent} from "./register/register.component";
import {RecuperaPasswordComponent} from "./login/login-form/recupera-password/recupera-password.component";
import {HomeComponent} from "./home/home.component";
// import {SideMenuComponent} from "./side-menu/side-menu.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'recupera-password', component: RecuperaPasswordComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  // {path: '', component: SideMenuComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
