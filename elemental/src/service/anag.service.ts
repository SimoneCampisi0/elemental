import { Injectable } from '@angular/core';
import { AbstractService } from './abstractservice';
import { UserDTO} from "../dto/userdto";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';
import {LoginDTO} from "../dto/logindto";
import {AnagDTO} from "../dto/anagdto";

@Injectable({
  providedIn: 'root'
})
export class AnagService extends AbstractService<AnagDTO>{

  constructor(http: HttpClient) {
    super(http);
    this.type = 'anag';
  }



}
