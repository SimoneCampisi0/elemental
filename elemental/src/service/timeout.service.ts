import {Injectable} from "@angular/core";
import {AbstractService} from "./abstractservice";
import {CommentoDTO} from "../dto/commentodto";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import {UserDTO} from "../dto/userdto";
import {Idle} from "@ng-idle/core";
import {Router} from "@angular/router";
import {LogService} from "./logservice";

@Injectable({
  providedIn: 'root'
})

export class TimeoutService {
  constructor(private idle: Idle, private router: Router, private logService: LogService) {
    console.log("avvio il TimeoutService")
    // idle.setIdle(3600)
    idle.setIdle(3550)
    idle.setTimeout(1)
    idle.watch()

    idle.onTimeout.subscribe(() => {
      // @ts-ignore
      this.logService.logout(JSON.parse(localStorage.getItem('currentUser'))).subscribe(()=> {
        localStorage.clear()
        this.router.navigate(['/login'])
      })
      this.router.navigate(['/login'])
    })
  }

}
