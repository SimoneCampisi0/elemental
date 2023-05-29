import { Injectable } from '@angular/core';
import { AbstractService } from './abstractservice';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';
import {PostDTO} from "../dto/postdto";


@Injectable({
  providedIn: 'root'
})
export class PostService extends AbstractService<PostDTO>{
  constructor(http: HttpClient) {
    super(http);
    this.type = 'post';
  }

}
