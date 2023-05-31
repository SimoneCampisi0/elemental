import { Injectable } from '@angular/core';
import { AbstractService } from './abstractservice';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';
import {PostDTO} from "../dto/postdto";
import {UserDTO} from "../dto/userdto";


@Injectable({
  providedIn: 'root'
})
export class PostService extends AbstractService<PostDTO>{
  constructor(http: HttpClient) {
    super(http);
    this.type = 'post';
  }
  addLike(idPost: number): Observable<PostDTO> {
    return this.http.get<PostDTO>(environment.APIEndpoint + this.type + '/addLike?idPost='+idPost)
  }

  removeLike(idPost: number): Observable<PostDTO> {
    return this.http.get<PostDTO>(environment.APIEndpoint + this.type + '/removeLike?idPost='+idPost)
  }
}
