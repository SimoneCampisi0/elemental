import {Component, OnInit} from '@angular/core';
import { PostService } from "../../../../service/post.service";
import { PostDTO } from "../../../../dto/postdto";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-elenco-post',
  templateUrl: './elenco-post.component.html',
  styleUrls: ['./elenco-post.component.css']
})
export class ElencoPostComponent implements OnInit {
  // @ts-ignore
  elencoPost$: Observable<PostDTO[]>;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.elencoPost$ = this.postService.getAll();
  }
}
