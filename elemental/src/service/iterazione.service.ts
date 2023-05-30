import {Injectable} from "@angular/core";
import {AbstractService} from "./abstractservice";
import {HttpClient} from "@angular/common/http";
import {IterazioneDTO} from "../dto/iterazionedto";
import {LoginDTO} from "../dto/logindto";
import {Observable} from "rxjs";
import {UserDTO} from "../dto/userdto";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class IterazioneService extends AbstractService<IterazioneDTO>{
  constructor(http: HttpClient) {
    super(http);
    this.type = 'iterazione';
  }
  findByIdUser(id: number): Observable<IterazioneDTO> {
    return this.http.get<IterazioneDTO>(environment.APIEndpoint + this.type + '/findByIdUser?id='+id)
  }
}
