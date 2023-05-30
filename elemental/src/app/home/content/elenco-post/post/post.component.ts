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
  iterazione: IterazioneDTO

  constructor(private anagService: AnagService, private itService: IterazioneService) {
  }

  ngOnInit() {
    this.anagAutore$ = this.anagService.findAnagByEmail(this.email)
    // @ts-ignore
    this.user = JSON.parse(localStorage.getItem('currentUser'))
  }

  setLike() {
    this.itService.findByIdUser(this.user.id).subscribe(it => {
      if(it != null) {
        if(it.likes==0) { //se non è ancora stato messo mi piace
          //metodo per mettere mi piace
        } else {
          //metodo per rimuovere il mi piace
        }
      } else { //se non esiste ancora un'interazione
        // @ts-ignore
        let Interazione: IterazioneDTO = new IterazioneDTO(0, 1,null,null,null,this.user, this.dto)

        console.log(JSON.stringify(Interazione))


        this.itService.insert(Interazione).subscribe()
      }


    })
  }


}
