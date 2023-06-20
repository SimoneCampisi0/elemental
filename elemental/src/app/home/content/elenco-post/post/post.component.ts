import {Component, Input} from '@angular/core';
import {UserService} from "../../../../../service/user.service";
import {PostService} from "../../../../../service/post.service";
import {AnagService} from "../../../../../service/anag.service";
import {debounceTime, EMPTY, map, Observable} from "rxjs";
import {PostDTO} from "../../../../../dto/postdto";
import {AnagDTO} from "../../../../../dto/anagdto";
import {InterazioneService} from "../../../../../service/interazione.service";
import {UserDTO} from "../../../../../dto/userdto";
import {InterazioneDTO} from "../../../../../dto/InterazioneDTO";
import Swal from "sweetalert2";

import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {FotoService} from "../../../../../service/foto.service";
import {CommentoService} from "../../../../../service/commento.service";
import {CommentoDTO} from "../../../../../dto/commentodto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

  userImgMap: Map<number, string> = new Map()

  // @ts-ignore
  @Input() dto: PostDTO
  @Input() email: string = '';
  // @ts-ignore
  @Input() date: Date;
  @Input() content: string = '';

  commentoString: string = ''

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

  base64Img: string = ""

  // @ts-ignore
  commenti: CommentoDTO[] = {}

  // @ts-ignore
  comments: string[]
  // @ts-ignore
  // iterazione$: Observable<IterazioneDTO>

  constructor(private router: Router, private anagService: AnagService, private itService: InterazioneService, private postService: PostService, private fotoService: FotoService, private commentoService: CommentoService, private userService: UserService) {
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
        if(this.interazione.likes==1) {
          this.boolLike = true;
        }
      }
    })

    this.postService.checkPostInsertByCurrentUser(this.dto.idPost, this.user.id).subscribe(x => {
      this.boolTrash = x
    })

    this.fotoService.readFoto(this.dto.user.id).subscribe(x=> {
      // @ts-ignore
      this.base64Img = 'data:image/jpeg;base64,' + x; //l'immagine non è un JSON.
    })


    this.commentoService.getAllByPostIdPost(this.dto.idPost).subscribe(x => {
      this.commenti = x;

      for (let i = 0; i < this.commenti.length; i++) {
        this.fotoService.readFoto(this.commenti[i].user.id).subscribe(a => {
          this.userImgMap.set(this.commenti[i].user.id, 'data:image/jpeg;base64,'+a);

          // Iterazione sui valori della mappa
          // this.userImgMap.forEach((value) => {
          //   console.log("Valore: " + value);
          // });
        });
      }
    });


// Iterazione sui valori della mappa

  }

  // findAutore(userInput: UserDTO): string {
  //   let nomeAutore = ''
  //   this.anagService.findAnagByEmail(userInput.email).subscribe(x => {
  //     nomeAutore = x.nome + x.cognome;
  //   })
  //   return nomeAutore
  // }

  // findAutore(userInput: UserDTO) {
  //   this.anagService.findAnagByEmail(userInput.email).subscribe(x => {
  //     this.nomeAutore = x.nome + " "+ x.cognome;
  //     console.log("nome autore: "+this.nomeAutore)
  //   });
  // }


  setLike() {
    this.itService.findByUserIdAndPostIdPost(this.user.id,this.dto.idPost).subscribe(it => {
      if(it == null){ //se non esiste ancora un'interazione tra l'utente e il post
        this.postService.addLike(this.dto.idPost).subscribe()
        // @ts-ignore
        let inter = new InterazioneDTO(0,1, this.user,this.dto)
        this.itService.insert(inter).subscribe()
        this.likes++

        this.boolLike = true
      }
      else { //se esiste un'interazione tra l'utente e il post
        let inter: InterazioneDTO
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



  reloadPage() {
    window.location.reload();
  }

  deleteCommento(commento: CommentoDTO) {
    this.commentoService.delete(commento.id).subscribe()
    this.reloadPage()
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
        this.itService.getAll().pipe(
          switchMap((array) => {
            if (array.length === 0) { //se non esistono interazioni
              // Array vuoto, esegui azione specifica
              console.log("Array vuoto");
              this.postService.removeLike(this.dto.idPost).subscribe(y => {
                this.commentoService.deleteAllByPostIdPost(this.dto.idPost).subscribe(z =>  {
                  if(z===1) {
                    this.postService.delete(this.dto.idPost).subscribe()

                    Swal.fire(
                      'Post eliminato!',
                      'Il post è stato eliminato.',
                      'success'
                    )

                    this.reloadPage()

                  }
                })
              })

            } else {
              // Array non vuoto, emetti gli elementi come osservazioni separate
              return of(...array);
            }
            return EMPTY; // Aggiungiamo questa riga per assicurarci che il flusso restituisca un valore in tutti i casi
          })
        ).subscribe((item) => {
          console.log("item.id: " + item.post.idPost + "dto.id: "+this.dto.idPost)
          if (item.post.idPost == this.dto.idPost) { //se esiste un'interazione in relazione con il post in questione
            this.itService.delete(item.id).subscribe(x => {
              this.postService.removeLike(this.dto.idPost).subscribe(y => {
                this.commentoService.deleteAllByPostIdPost(this.dto.idPost).subscribe(z =>  {
                    this.postService.delete(this.dto.idPost).subscribe()

                    Swal.fire(
                      'Post eliminato!',
                      'Il post è stato eliminato.',
                      'success'
                    )

                    this.reloadPage()
                  })
              })
            })
          } else {
            this.postService.removeLike(this.dto.idPost).subscribe(y => {
              this.commentoService.deleteAllByPostIdPost(this.dto.idPost).subscribe(z =>  {
                this.postService.delete(this.dto.idPost).subscribe()

                Swal.fire(
                  'Post eliminato!',
                  'Il post è stato eliminato.',
                  'success'
                )

                this.reloadPage()
              })
            })
          }
        });
      }
    })
  }

  inviaCommento() {
    this.anagService.findAnagByEmail(this.user.email).subscribe(x => {
      let nomeAutore = x.nome +" "+x.cognome
      let dto = new CommentoDTO(0, nomeAutore,this.commentoString, new Date(), this.user, this.dto)
      this.commentoService.insert(dto).subscribe(() => {
        this.reloadPage()
      })
    })

  }

  dettaglioAutore() {
    this.anagAutore$.subscribe(dettAnag => {
      localStorage.setItem('dettAnag',JSON.stringify(dettAnag))
      this.userService.findUserByEmail(this.email).subscribe(x => {
        localStorage.setItem('dettUser',JSON.stringify(x))
        this.router.navigate(['/dettaglio-user'])
          // .then(() => {
          //   window.location.reload();
          // });
      })
    })
  }

  commentoDettaglioAutore(user: UserDTO) {
    this.anagService.findAnagByEmail(user.email).subscribe(a=> {
      localStorage.setItem('dettAnag',JSON.stringify(a))
      localStorage.setItem('dettUser',JSON.stringify(user))
      this.router.navigate(['/dettaglio-user'])
    })
  }

  ngOnDestroy() {

  }
}
