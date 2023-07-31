import {Injectable} from "@angular/core";
import {AbstractService} from "./abstractservice";
import {HttpClient} from "@angular/common/http";
import {LoginDTO} from "../dto/logindto";
import {Observable} from "rxjs";
import {UserDTO} from "../dto/userdto";
import {environment} from "../environments/environment";
// @ts-ignore
import {InterazioneDTO} from "../dto/InterazioneDTO";

@Injectable({
  providedIn: 'root'
})
export class InterazioneService extends AbstractService<InterazioneDTO>{
  constructor(http: HttpClient) {
    super(http);
    this.type = 'elemental/interazione';
  }
  // findByIdUser(id: number): Observable<IterazioneDTO> {
  //   return this.http.get<IterazioneDTO>(environment.APIEndpoint + this.type + '/findByIdUser?id='+id)
  // }

  findByUserIdAndPostIdPost(id: number, idPost: number): Observable<InterazioneDTO> {
    return this.http.get<InterazioneDTO>(environment.APIEndpoint + this.type + '/findByUserIdAndPostIdPost?id='+id+'&idPost='+idPost)
  }


  setLike(id: number, idPost: number): Observable<InterazioneDTO> {
    return this.http.get<InterazioneDTO>(environment.APIEndpoint + this.type + '/setLike?id='+id+'&idPost='+idPost)
  }

  unsetLike(id: number, idPost: number): Observable<InterazioneDTO> {
    return this.http.get<InterazioneDTO>(environment.APIEndpoint + this.type + '/unsetLike?id='+id+'&idPost='+idPost)
  }
}
