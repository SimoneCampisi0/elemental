import { Component } from '@angular/core';
import {forkJoin, map, Observable, timer} from "rxjs";
import { LogService } from "../../../service/logservice";
import { switchMap, filter } from "rxjs/operators";
import { UserDTO } from "../../../dto/userdto";
import {AnagService} from "../../../service/anag.service";
import {AnagDTO} from "../../../dto/anagdto";

@Component({
  selector: 'app-friends-bar',
  templateUrl: './friends-bar.component.html',
  styleUrls: ['./friends-bar.component.css']
})
export class FriendsBarComponent {
  //@ts-ignore
  currentUser: UserDTO
  //@ts-ignore
  listaAmici$: Observable<AnagDTO[]>
  amiciOnline: boolean = false

  constructor(private logService: LogService, private anagService: AnagService) {}

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

    this.listaAmici$ = timer(0, 2000).pipe(
      switchMap(() => this.logService.getLoggedUsers()),
      switchMap((amici: UserDTO[]) => {
        const anagraficaObservables = amici.map(amico => this.anagService.findAnagByEmail(amico.email));
        return forkJoin(anagraficaObservables);
      }),
      map(anagrafiche => anagrafiche.filter(anagrafica => anagrafica !== null))
    );
  }

}
