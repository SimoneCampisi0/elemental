import { Injectable } from '@angular/core';
import { AbstractService } from './abstractservice';
import { UserDTO} from "../dto/userdto";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';
import {LoginDTO} from "../dto/logindto";
import {RegisterRequestDTO} from "../dto/registerrequestdto";
import {RegisterResponseDTO} from "../dto/registeresponsedto";

@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractService<UserDTO>{

  constructor(http: HttpClient) {
    super(http);
    this.type = 'user';
  }
  register (registerRequestDTO: RegisterRequestDTO): Observable<RegisterResponseDTO> {
    // return this.http.post<any>(environment.APIEndpoint + 'elemental/auth/register', registerRequestDTO)
    return this.http.post<any>('http://localhost:8081/elemental/auth/register', registerRequestDTO)

  }
  // login(loginDTO: LoginDTO): Observable<UserDTO> {
  //   return this.http.post<any>(environment.APIEndpoint + this.type + '/login', loginDTO)
  // }

  login(loginDTO: LoginDTO): Observable<RegisterResponseDTO> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*'});
    let options = { headers: headers };
    console.log(environment.APIEndpoint + 'elemental/auth/authenticate')
    return this.http.post<any>('http://localhost:8081/elemental/auth/authenticate', loginDTO, options)
    // return this.http.post<any>(environment.APIEndpoint + 'elemental/auth/authenticate', loginDTO, options)
  }

  recuperaPassword(user: UserDTO): Observable<UserDTO> {
    return this.http.post<any>('http://localhost:8081/elemental/user/recuperaPassword', user)
  }

  findUserByEmail(email: string): Observable<UserDTO> {
    return this.http.get<UserDTO>('http://localhost:8081/elemental/user/findUserByEmail?email='+email)
  }

}
