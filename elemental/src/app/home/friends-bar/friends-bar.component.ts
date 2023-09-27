import { Component, HostListener } from '@angular/core';
import {forkJoin, map, Observable, timer} from "rxjs";
import { LogService } from "../../../service/logservice";
import { switchMap, filter } from "rxjs/operators";
import { UserDTO } from "../../../dto/userdto";
import {AnagService} from "../../../service/anag.service";
import {AnagDTO} from "../../../dto/anagdto";
import {UserService} from "../../../service/user.service";
import {Router} from "@angular/router";
import {ChatService} from "../../../service/chat.service";

@Component({
  selector: 'app-friends-bar',
  templateUrl: './friends-bar.component.html',
  styleUrls: ['./friends-bar.component.css']
})
export class FriendsBarComponent {

  mostraChat: boolean = false;

  //@ts-ignore
  currentUser: UserDTO
  //@ts-ignore
  currentAnag: AnagDTO
  //@ts-ignore
  listaAmici$: Observable<AnagDTO[]>

  amiciOnline: boolean = false

  //@ts-ignore
  windowSize: number

  constructor(public chatService: ChatService, private router: Router, private logService: LogService, private anagService: AnagService, private userService: UserService) {}

  // ngOnInit() {
  //   // @ts-ignore
  //   this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
  //
  //   this.listaAmici$ = timer(0, 2000).pipe(
  //     switchMap(() => this.logService.getLoggedUsers()),
  //     map((amici: UserDTO[]) => amici.filter(amico => amico.email !== this.currentUser.email))
  //   );
  // }
  ngOnInit() {
    // @ts-ignore
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // @ts-ignore
    this.currentAnag = JSON.parse(localStorage.getItem('currentAnag'))

    this.listaAmici$ = timer(0, 2000).pipe(
      switchMap(() => this.logService.getLoggedUsers()), //prende l'observable ottenuto con getLoggedUsers
      switchMap((amici: UserDTO[]) => { //prende l'observable generato in precedenza e applica le operazioni di seguito
        const anagraficaObservables = amici.map(amico => this.anagService.findAnagByEmail(amico.email));
        return forkJoin(anagraficaObservables); //unisce tutti gli observables generati in anagraficaObservables in un unico observable
      }),
      map(anagrafiche => anagrafiche.filter(anagrafica => anagrafica.nome !== this.currentAnag.nome && anagrafica.cognome !== this.currentAnag.cognome))
    );

    this.windowSize = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  changeWindowSize() {
    this.windowSize = window.innerWidth;
  }

  comeBack() {
    this.chatService.mostraFriendsBar = false;
  }

  vediProfilo(anag: AnagDTO) {
    let tempUser = anag.user
    localStorage.setItem('dettAnag',JSON.stringify(anag))
    localStorage.setItem('dettUser',JSON.stringify(tempUser))
    this.router.navigate(['/dettaglio-user'])
  }

  setProfiloRicevitore(anag: AnagDTO) {
    let tempUser = anag.user
    let tempAnag = anag

    this.chatService.userRicevitore = tempUser;
    this.chatService.anagRicevitore = tempAnag
  }


  cambiaSchermata(anag: AnagDTO) {
    this.setProfiloRicevitore(anag)
    this.chatService.mostraChat = true;
  }
}
