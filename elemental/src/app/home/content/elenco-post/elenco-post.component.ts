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
  filterPost: PostDTO[] = []; // Inizializza l'array filterPost

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.filterPost$.subscribe(filterPost => {
        console.log("Post filtrati: "+filterPost)
        if(filterPost.length !== 0) {

        console.log("filterPost != null: "+filterPost)

          this.elencoPost$ = this.postService.filterPost$ // Aggiorna l'array filterPost ogni volta che viene modificato nel servizio
        } else {

          console.log("filterPost == null: "+filterPost)


          this.elencoPost$ = this.postService.getAll();
        }
    });
  }
}
