import { Component } from '@angular/core';
import {PostService} from "../../../../service/post.service";
import {PostDTO} from "../../../../dto/postdto";

@Component({
  selector: 'app-elenco-post',
  templateUrl: './elenco-post.component.html',
  styleUrls: ['./elenco-post.component.css']
})
export class ElencoPostComponent {
  // @ts-ignore
  elencoPost: PostDTO[]
  // item = 'Ciao'
  constructor(private postService: PostService) {
  }
  ngOnInit() {
    this.postService.getAll().subscribe(elenco => {
      this.elencoPost = elenco
      console.log(this.elencoPost)
    })
  }
}
