import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {UserDTO} from "../../../dto/userdto";
import {AnagService} from "../../../service/anag.service";
import {AnagDTO} from "../../../dto/anagdto";

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {
  // @ts-ignore
  nomeUser: string

  //@ts-ignore
  anag: AnagDTO
  constructor(private router: Router, private anagService: AnagService) {
  }

  ngOnInit() {
    // @ts-ignore
    let user: UserDTO = JSON.parse(localStorage.getItem('currentUser'))
    // @ts-ignore

    this.anag = JSON.parse(localStorage.getItem('currentAnag'));
  }
  goHome () {
    this.router.navigate(['/home'])
  }

  goLogin () {
    this.router.navigate([''])
  }

  logout() {
    localStorage.clear()
    this.router.navigate([''])
  }

}
