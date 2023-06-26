import {Injectable} from "@angular/core";
import {AbstractService} from "./abstractservice";
import {CommentoDTO} from "../dto/commentodto";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import {UserDTO} from "../dto/userdto";
import {AnagDTO} from "../dto/anagdto";

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  type: string ='';
  port: string = '8080';

  public mostaChat: boolean = false;

  // @ts-ignore
  public userRicevitore: UserDTO;

  // @ts-ignore
  public anagRicevitore: AnagDTO;
  constructor(protected http: HttpClient) {
    this.type = 'chat';
  }

}
