import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {
  constructor(private router: Router) {
  }

  goHome () {
    this.router.navigate(['/home'])
  }

}
