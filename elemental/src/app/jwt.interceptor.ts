import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserService} from "../service/user.service";
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Ottieni la JWT dal servizio di autenticazione
    const jwt = localStorage.getItem('token')
    // console.log(request.url);
    // console.log(request.headers);
    // Clona la richiesta originale e aggiungi l'intestazione Authorization con la JWT
    if (jwt != null) {
      // console.log("Ciso grdyu")
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${jwt}`,
          // 'Access-Control-Allow-Origin': '*'
        }

      });
    }
    // console.log(request.headers);
    // Passa la richiesta al gestore successivo
    return next.handle(request);

  }
}
