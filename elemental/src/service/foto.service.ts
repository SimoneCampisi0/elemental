import { Injectable } from '@angular/core';
import { AbstractService } from './abstractservice';
import { UserDTO} from "../dto/userdto";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';
import {LoginDTO} from "../dto/logindto";
import {AnagDTO} from "../dto/anagdto";
import {FotoDTO} from "../dto/fotodto";
import {FotoRequestDTO} from "../dto/fotorequestdto";
import {IterazioneDTO} from "../dto/iterazionedto";

@Injectable({
  providedIn: 'root'
})
export class FotoService extends AbstractService<FotoDTO>{

  constructor(http: HttpClient) {
    super(http);
    this.type = 'foto';
  }
  insertFoto(dto: FotoRequestDTO): Observable<FotoDTO> {
    return this.http.post<FotoDTO>(environment.APIEndpoint + this.type + '/insertFoto', dto);
  }

  readFoto(id: number): Observable<string> { //read foto by idUser
    return this.http.get(environment.APIEndpoint + this.type + '/readFoto?id=' + id, { responseType: 'text' });
  }
}
