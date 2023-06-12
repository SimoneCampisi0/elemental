import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import {Router} from "@angular/router";
import {UserService} from "../../../../service/user.service";

@Component({
  selector: 'app-recupera-password',
  templateUrl: './recupera-password.component.html',
  styleUrls: ['./recupera-password.component.css']
})
export class RecuperaPasswordComponent {
  recuperaForm: FormGroup;
  // loginDTO: LoginDTO;

  constructor(private userService: UserService, private router: Router) {
    this.recuperaForm = new FormGroup({
      email: new FormControl(''),
      password1: new FormControl(''),
      password2: new FormControl('')
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    let email = this.recuperaForm.get('email')?.value
    let password1 = this.recuperaForm.get('password1')?.value
    let password2 = this.recuperaForm.get('password2')?.value

    console.log("EMAIL: "+email)

    if (password1 === password2 && password1 !== '' && email !== '') {
      this.userService.findUserByEmail(email).subscribe(user => {
        user.password = password1
        this.userService.recuperaPassword(user).subscribe()

        Swal.fire({
          icon: 'success',
          title: 'Password modificata',
          text: 'Password modificata con successo.'
        });

        this.router.navigate(['/login'])
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Valori non validi',
        text: 'I valori inseriti non sono validi. Riprova.'
      });
    }


  }

  terminiAlert() {
    Swal.fire({
      icon: 'info',
      title: 'Termini e Condizioni',
      text: 'Accedendo e utilizzando questa piattaforma, accetti di rispettare i seguenti Termini e Condizioni:\n\n1. Non violare i diritti di proprietà intellettuale altrui.\n2. Non diffondere contenuti offensivi, diffamatori o illegali.\n3. Rispettare la privacy degli altri utenti.\n4. Non utilizzare la piattaforma per scopi commerciali senza autorizzazione.\n5. Mantenere la sicurezza del tuo account e non condividere le tue credenziali di accesso.\n\nTi preghiamo di leggere attentamente i Termini e le Condizioni complete disponibili sul nostro sito web.',
    });
  }

  policyAlert() {
    Swal.fire({
      icon: 'info',
      title: 'Privacy Policy',
      text: 'Privacy Policy.'
    });
  }

  redirectRegister() {
    this.router.navigate(['/register'])
  }

  passwordDimenticata() {

  }


}
