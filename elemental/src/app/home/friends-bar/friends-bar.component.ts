import { Component } from '@angular/core';
import {map, Observable, timer} from "rxjs";
import { LogService } from "../../../service/logservice";
import { switchMap, filter } from "rxjs/operators";
import { UserDTO } from "../../../dto/userdto";

@Component({
  selector: 'app-friends-bar',
  templateUrl: './friends-bar.component.html',
  styleUrls: ['./friends-bar.component.css']
})
export class FriendsBarComponent {
  //@ts-ignore
  currentUser: UserDTO
  //@ts-ignore
  listaAmici$: Observable<UserDTO[]>
  amiciOnline: boolean = false

  constructor(private logService: LogService) {}

  ngOnInit() {
    // @ts-ignore
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))

    this.listaAmici$ = timer(0, 2000).pipe(
      switchMap(() => this.logService.getLoggedUsers()),
      map((amici: UserDTO[]) => amici.filter(amico => amico.email !== this.currentUser.email))
    );
  }
}
