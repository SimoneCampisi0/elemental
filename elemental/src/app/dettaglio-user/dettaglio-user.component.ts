import { Component } from '@angular/core';
import {UserService} from "../../service/user.service";
import {AnagService} from "../../service/anag.service";
import {UserDTO} from "../../dto/userdto";
import {AnagDTO} from "../../dto/anagdto";
import {FotoService} from "../../service/foto.service";
import {PostService} from "../../service/post.service";

@Component({
  selector: 'app-dettaglio-user',
  templateUrl: './dettaglio-user.component.html',
  styleUrls: ['./dettaglio-user.component.css']
})
export class DettaglioUserComponent {
  descrizione: string = ''

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


}
