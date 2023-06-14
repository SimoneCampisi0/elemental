import { Component } from '@angular/core';
import {UserService} from "../../service/user.service";
import {AnagService} from "../../service/anag.service";
import {UserDTO} from "../../dto/userdto";
import {AnagDTO} from "../../dto/anagdto";
import {FotoService} from "../../service/foto.service";
import {PostService} from "../../service/post.service";
import Swal from "sweetalert2";
import {PostDTO} from "../../dto/postdto";

@Component({
  selector: 'app-dettaglio-user',
  templateUrl: './dettaglio-user.component.html',
  styleUrls: ['./dettaglio-user.component.css']
})
export class DettaglioUserComponent {
  base64Img: string = ''

  numAmici = 0

  numPost: number = 0

  // @ts-ignore
  user: UserDTO
  // @ts-ignore
  anag: AnagDTO
  constructor(private fotoService: FotoService, private userService:UserService, private anagService: AnagService, private postService: PostService) {
    // @ts-ignore
    this.user = JSON.parse(localStorage.getItem('currentUser'))
  }
  ngOnInit() {
    this.anagService.findAnagByEmail(this.user.email).subscribe(x => {
      this.anag = x
    })

    this.fotoService.readFoto(this.user.id).subscribe(x=> {
      // @ts-ignore
      this.base64Img = 'data:image/jpeg;base64,' + x; //l'immagine non è un JSON. Angular non riesce a leggerlo
    })

     this.calcoloNumeroPostByUser()

  }

  calcoloNumeroPostByUser() {
     this.postService.calcoloNumeroPostByUser(this.user.id).subscribe(x => {
       this.numPost = x;
     })
  }

  modificaDescr() {
    Swal.fire({
      title: 'Modifica la tua biografia',
      html:
        // '<h2 style="margin: 0px">Modifica la tua biografia</h2>'+
        '<textarea id="input-content" name="content" cols="40" rows="5" style="padding: 1em;"></textarea>\n',
      focusConfirm: false,
      preConfirm: () => {

        // @ts-ignore
        const content = Swal.getPopup().querySelector('#input-content').value;


        // Crea un oggetto PostDTO con i dati inseriti dall'utente
        this.anag.descrizione = content

        this.anagService.update(this.anag).subscribe(x => {
          localStorage.setItem('currentAnag',JSON.stringify(x))
        })

        // this.refreshPage()
      }
    });
  }


}
