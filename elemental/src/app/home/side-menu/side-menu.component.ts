import {Component, HostListener} from '@angular/core';
import {Router} from "@angular/router";
import {UserDTO} from "../../../dto/userdto";
import {AnagService} from "../../../service/anag.service";
import {AnagDTO} from "../../../dto/anagdto";
import {FotoService} from "../../../service/foto.service";
import {LogService} from "../../../service/logservice";

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {
  width = 0

  height = 0

  posUrl = 0
  // @ts-ignore
  nomeUser: string

  //@ts-ignore
  user: UserDTO

  //@ts-ignore
  anag: AnagDTO

  base64Img: string = ''
  constructor(private logService: LogService, private router: Router, private anagService: AnagService, private fotoService: FotoService) {
  }

  ngOnInit() {
    // @ts-ignore
    this.user = JSON.parse(localStorage.getItem('currentUser'))
    // @ts-ignore
    this.anag = JSON.parse(localStorage.getItem('currentAnag'));

    this.fotoService.readFoto(this.user.id).subscribe(x=> {
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

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.width = (event.target as Window).innerWidth;
    this.height = (event.target as Window).innerHeight;
    console.log("width: "+this.width)
  }

  goHome () {
    this.router.navigate(['/home'])
  }

  goLogin () {
    this.router.navigate([''])
  }

  goDettaglioUser () {
    localStorage.removeItem('dettUser')
    localStorage.removeItem('dettAnag')
    this.router.navigate(['/dettaglio-user'])
  }

  logout() {
    this.logService.logout(this.user).subscribe(()=> {
      localStorage.clear()
      this.router.navigate([''])
    })
  }

}
