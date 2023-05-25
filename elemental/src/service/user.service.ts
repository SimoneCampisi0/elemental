import { Injectable } from '@angular/core';
import { AbstractService } from './abstractservice';
import { UserDTO} from "../dto/userdto";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';
import {LoginDTO} from "../dto/logindto";

@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractService<UserDTO>{

  constructor(http: HttpClient) {
    super(http);
    this.type = 'user';
  }

  login(loginDTO: LoginDTO): Observable<UserDTO> {
    return this.http.post<any>(environment.APIEndpoint + this.type + '/login', LoginDTO)
  }

}
