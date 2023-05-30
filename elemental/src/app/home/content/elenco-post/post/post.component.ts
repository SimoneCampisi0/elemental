import {Component, Input} from '@angular/core';
import {UserService} from "../../../../../service/user.service";
import {PostService} from "../../../../../service/post.service";
import {AnagService} from "../../../../../service/anag.service";
import {Observable} from "rxjs";
import {PostDTO} from "../../../../../dto/postdto";
import {AnagDTO} from "../../../../../dto/anagdto";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input() email: string = '';
  // @ts-ignore
  @Input() date: Date;
  @Input() content: string = '';
  // @Input() likes: number = 0;

  // @ts-ignore
  anagAutore$: Observable<AnagDTO>;


  constructor(private anagService: AnagService, private postService: PostService) {
  }

  ngOnInit() {
    this.anagAutore$ = this.anagService.findAnagByEmail(this.email)

  }

  setLike() {
    // this.likes++;
    // this.postService.
  }
}
