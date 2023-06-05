import { Injectable } from '@angular/core';
import { AbstractService } from './abstractservice';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { environment } from './../environments/environment';
import {PostDTO} from "../dto/postdto";
import {UserDTO} from "../dto/userdto";


@Injectable({
  providedIn: 'root'
})
export class PostService extends AbstractService<PostDTO>{

  private filterPostSubject: BehaviorSubject<PostDTO[]> = new BehaviorSubject<PostDTO[]>([]);
  filterPost$ = this.filterPostSubject.asObservable();
  ricercaAvviata: boolean = false;

  constructor(http: HttpClient) {
    super(http);
    this.type = 'post';
  }

  setFilterPost(filterPost: PostDTO[]): void {
    this.filterPostSubject.next(filterPost);
  }

  addLike(idPost: number): Observable<PostDTO> {
    return this.http.get<PostDTO>(environment.APIEndpoint + this.type + '/addLike?idPost='+idPost)
  }

  removeLike(idPost: number): Observable<PostDTO> {
    return this.http.get<PostDTO>(environment.APIEndpoint + this.type + '/removeLike?idPost='+idPost)
  }

  checkPostInsertByCurrentUser(idPost: number, id: number): Observable<Boolean> {
    return this.http.get<Boolean>(environment.APIEndpoint + this.type + '/checkPostInsertByCurrentUser?idPost='+idPost+'&id='+id)
  }

}
