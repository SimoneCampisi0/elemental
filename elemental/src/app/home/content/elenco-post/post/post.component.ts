import {Component, Input} from '@angular/core';
import {UserService} from "../../../../../service/user.service";
import {PostService} from "../../../../../service/post.service";
import {AnagService} from "../../../../../service/anag.service";
import {debounceTime, EMPTY, Observable} from "rxjs";
import {PostDTO} from "../../../../../dto/postdto";
import {AnagDTO} from "../../../../../dto/anagdto";
import {IterazioneService} from "../../../../../service/iterazione.service";
import {UserDTO} from "../../../../../dto/userdto";
import {IterazioneDTO} from "../../../../../dto/iterazionedto";
import Swal from "sweetalert2";

import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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

  boolLike: boolean = false;

  boolTrash: Boolean = false;

  // @ts-ignore
  likes

  // @ts-ignore
  interazione: IterazioneDTO

  // @ts-ignore
  anagAutore$: Observable<AnagDTO>;
  // @ts-ignore
  user: UserDTO;

  // @ts-ignore
  // iterazione$: Observable<IterazioneDTO>

  constructor(private anagService: AnagService, private itService: IterazioneService, private postService: PostService) {
  }

  ngOnInit() {
    this.anagAutore$ = this.anagService.findAnagByEmail(this.email)
    // @ts-ignore
    this.user = JSON.parse(localStorage.getItem('currentUser'))

    // this.iterazione$ = this.itService.findByIdUser(this.user.id)

    this.likes = this.dto.likes

    this.itService.findByUserIdAndPostIdPost(this.user.id, this.dto.idPost).subscribe(x => {
      if(x !== null) {
        this.interazione = x;
        this.boolLike = true;
      }
    })

    this.postService.checkPostInsertByCurrentUser(this.dto.idPost, this.user.id).subscribe(x => {
      this.boolTrash = x
    })

  }

  setLike() {
    this.itService.findByUserIdAndPostIdPost(this.user.id,this.dto.idPost).subscribe(it => {
      if(it == null){ //se non esiste ancora un'interazione tra l'utente e il post
        this.postService.addLike(this.dto.idPost).subscribe()
        // @ts-ignore
        let inter = new IterazioneDTO(0,1, null,null,null,this.user,this.dto)
        this.itService.insert(inter).subscribe()
        this.likes++

        this.boolLike = true
      }
      else { //se esiste un'interazione tra l'utente e il post
        let inter: IterazioneDTO
        this.itService.findByUserIdAndPostIdPost(this.user.id,this.dto.idPost).subscribe(x => {
          inter = x;
          // @ts-ignore
          if(inter.likes == 0) { //se esiste un'interazione ma non è stato messo mi piace
            // @ts-ignore
            this.itService.setLike(this.user.id, this.dto.idPost).subscribe(x => {
              this.postService.addLike(this.dto.idPost).subscribe(x => {
                this.likes++

                this.boolLike = true

              })
            })

          } else {
            this.itService.unsetLike(this.user.id, this.dto.idPost).subscribe(x => {
              this.postService.removeLike(this.dto.idPost).subscribe(x => {
                this.likes--

                this.boolLike = false

              })
            })
          }
        })
      }
    })
  }


  deletePost() {
    Swal.fire({
      title: 'Sei sicuro di voler eliminare il post?',
      text: "Quest'azione è irreversibile.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annulla',
      confirmButtonText: 'Conferma'
    }).then((result) => {
      if (result.isConfirmed) {
        // if(typeof this.interazione !== 'undefined') { //     ---Controllare tutte le interazioni.
        //
        //   console.log(JSON.stringify(this.interazione))
        //
        //   this.itService.delete(this.interazione.id).subscribe(x => {
        //     this.postService.delete(this.dto.idPost).subscribe()
        //   })
        // } else {
        //   this.postService.delete(this.dto.idPost).subscribe()
        // }

        this.itService.getAll().pipe(
          switchMap((array) => {
            if (array.length === 0) {
              // Array vuoto, esegui azione specifica
              console.log("Array vuoto");
              this.postService.removeLike(this.dto.idPost).subscribe(y => {
                this.postService.delete(this.dto.idPost).subscribe()
              })

            } else {
              // Array non vuoto, emetti gli elementi come osservazioni separate
              return of(...array);
            }
            return EMPTY; // Aggiungiamo questa riga per assicurarci che il flusso restituisca un valore in tutti i casi
          })
        ).subscribe((item) => {
          console.log("item: " + item.post.idPost)
          if (item.post.idPost == this.dto.idPost) {
            this.itService.delete(item.id).subscribe(x => {
              console.log("hello")
              this.postService.removeLike(this.dto.idPost).subscribe(y => {
                this.postService.delete(this.dto.idPost).subscribe()
              })
            })
          }
        });


        Swal.fire(
          'Post eliminato!',
          'Il post è stato eliminato.',
          'success'
        )
        // window.location.reload();

      }
    })


  }



// Chiamata alla funzione per mostrare l'alert
}
