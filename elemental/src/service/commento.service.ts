import {Injectable} from "@angular/core";
import {AbstractService} from "./abstractservice";
import {HttpClient} from "@angular/common/http";
import {LoginDTO} from "../dto/logindto";
import {Observable} from "rxjs";
import {UserDTO} from "../dto/userdto";
import {environment} from "../environments/environment";
// @ts-ignore
import {InterazioneDTO} from "../dto/InterazioneDTO";
import {CommentoDTO} from "../dto/commentodto";

@Injectable({
  providedIn: 'root'
})

export class CommentoService extends AbstractService<CommentoDTO>{
  constructor(http: HttpClient) {
    super(http);
    this.type = 'elemental/commento';
  }
  getAllByPostIdPost(idPost: number): Observable<CommentoDTO[]> {
    return this.http.get<CommentoDTO[]>(environment.APIEndpoint + this.type + '/getAllByPostIdPost?idPost=' + idPost);
  }

  deleteAllByPostIdPost(idPost: number): Observable<number> {
    return this.http.delete<number>(environment.APIEndpoint + this.type + '/deleteAllByPostIdPost?idPost=' + idPost);
  }
}
