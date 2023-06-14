import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {UserDTO} from "../../../dto/userdto";
import {AnagService} from "../../../service/anag.service";
import {AnagDTO} from "../../../dto/anagdto";
import {FotoService} from "../../../service/foto.service";

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {
  posUrl = 0
  // @ts-ignore
  nomeUser: string

  //@ts-ignore
  anag: AnagDTO

  base64Img: string = ''
  constructor(private router: Router, private anagService: AnagService, private fotoService: FotoService) {
  }

  ngOnInit() {
    // @ts-ignore
    let user: UserDTO = JSON.parse(localStorage.getItem('currentUser'))
    // @ts-ignore
    this.anag = JSON.parse(localStorage.getItem('currentAnag'));

    this.fotoService.readFoto(user.id).subscribe(x=> {
      // @ts-ignore
      this.base64Img = 'data:image/jpeg;base64,' + x; //l'immagine non è un JSON. Angular non riesce a leggerlo
    })

    let url = this.router.url
    switch (url) {
      case "/home":
        console.log("home");
        this.posUrl = 1;
        break;

      case "/dettaglio-user":
        console.log("dettaglio-user");
        this.posUrl = 2;
        break;

    }
  }
  goHome () {
    this.router.navigate(['/home'])
  }

  goLogin () {
    this.router.navigate([''])
  }

  goDettaglioUser () {
    this.router.navigate(['/dettaglio-user'])
  }

  logout() {
    localStorage.clear()
    this.router.navigate([''])
  }

}
