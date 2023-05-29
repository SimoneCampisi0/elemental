import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginFormComponent } from './login/login-form/login-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import { RegisterComponent } from './register/register.component';
import {RegisterFormComponent} from "./register/register-form/register-form.component";
import { RecuperaPasswordComponent } from './login/login-form/recupera-password/recupera-password.component';
import { HomeComponent } from './home/home.component';
import { SideMenuComponent} from "./home/side-menu/side-menu.component";
import {NgOptimizedImage} from "@angular/common";
import { ContentComponent } from './home/content/content.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchBarComponent } from './home/content/search-bar/search-bar.component';
import { ElencoPostComponent } from './home/content/elenco-post/elenco-post.component';
import { PostComponent } from './home/content/elenco-post/post/post.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginFormComponent,
    RegisterComponent,
    RegisterFormComponent,
    RecuperaPasswordComponent,
    HomeComponent,
    SideMenuComponent,
    ContentComponent,
    SearchBarComponent,
    ElencoPostComponent,
    PostComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgOptimizedImage,
        FormsModule,
        FontAwesomeModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
