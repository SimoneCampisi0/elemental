import {Injectable} from "@angular/core";
import {AbstractService} from "./abstractservice";
import {CommentoDTO} from "../dto/commentodto";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import {UserDTO} from "../dto/userdto";

@Injectable({
  providedIn: 'root'
})

export class LogService {
  type: string ='';
  port: string = '8080';
  constructor(protected http: HttpClient) {
    this.type = 'elemental/log';
  }
  getLoggedUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(environment.APIEndpoint + this.type + '/getLoggedUsers');
  }

  addLoggedUser(dto: UserDTO): Observable<any> {
    return this.http.post(environment.APIEndpoint + this.type + '/addLoggedUser', dto);
  }

  logout(dto: UserDTO): Observable<any> {
    return this.http.post(environment.APIEndpoint + this.type + '/logout', dto);
  }
}
