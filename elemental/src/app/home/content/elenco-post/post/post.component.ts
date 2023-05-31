import {Component, Input} from '@angular/core';
import {UserService} from "../../../../../service/user.service";
import {PostService} from "../../../../../service/post.service";
import {AnagService} from "../../../../../service/anag.service";
import {Observable} from "rxjs";
import {PostDTO} from "../../../../../dto/postdto";
import {AnagDTO} from "../../../../../dto/anagdto";
import {IterazioneService} from "../../../../../service/iterazione.service";
import {UserDTO} from "../../../../../dto/userdto";
import {IterazioneDTO} from "../../../../../dto/iterazionedto";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  // @ts-ignore
  @Input() dto: PostDTO
  @Input() email: string = '';
  // @ts-ignore
  @Input() date: Date;
  @Input() content: string = '';
  // @Input() likes: number = 0;

  // @ts-ignore
  anagAutore$: Observable<AnagDTO>;
  // @ts-ignore
  user: UserDTO;

  // @ts-ignore
  iterazione$: Observable<IterazioneDTO>

  constructor(private anagService: AnagService, private itService: IterazioneService, private postService: PostService) {
  }

  ngOnInit() {
    this.anagAutore$ = this.anagService.findAnagByEmail(this.email)
    // @ts-ignore
    this.user = JSON.parse(localStorage.getItem('currentUser'))

    this.iterazione$ = this.itService.findByIdUser(this.user.id)
  }

  setLike() {
    this.itService.findByIdUser(this.user.id).subscribe(it => {
      if(it != null) {
        if(it.likes==0) { //se non è ancora stato messo mi piace
          //metodo per incrementare mi piace
          this.postService.addLike(this.dto.idPost).subscribe()

          this.itService.setLike(it.id).subscribe()

          this.iterazione$ = this.itService.findByIdUser(this.user.id)


          this.ngOnInit();
        } else {
          //metodo per rimuovere il mi piace
          this.postService.removeLike(this.dto.idPost).subscribe()


          this.itService.unsetLike(it.id).subscribe()
          this.iterazione$ = this.itService.findByIdUser(this.user.id)


          this.ngOnInit();

        }
      } else { //se non esiste ancora un'interazione
        // @ts-ignore
        let Interazione: IterazioneDTO = new IterazioneDTO(0, 1,null,null,null,this.user, this.dto)

        this.itService.insert(Interazione).subscribe()

        this.postService.addLike(this.dto.idPost).subscribe()

        this.iterazione$ = this.itService.findByIdUser(this.user.id)


        this.ngOnInit();

      }
    })
  }
}
