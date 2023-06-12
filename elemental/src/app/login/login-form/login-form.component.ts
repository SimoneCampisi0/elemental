import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {UserService} from "../../../service/user.service";
import {LoginDTO} from "../../../dto/logindto";
import {UserDTO} from "../../../dto/userdto";
import Swal from 'sweetalert2';
import {Router} from "@angular/router";
import {AnagService} from "../../../service/anag.service";

 @Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  loginForm: FormGroup;
  // loginDTO: LoginDTO;

  constructor(private userService: UserService, private router: Router, private anagService: AnagService) {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  ngOnInit() {

  }

  onSubmit() {
    let email = this.loginForm.get('email')?.value;
    let password = this.loginForm.get('password')?.value;
    if (email !== '' && password !== '') {
      let loginDTO = new LoginDTO(email, password)
      console.log("loginDTO: "+loginDTO.email+ " " + loginDTO.password);

      this.userService.login(loginDTO).subscribe((response) => {
         if(response != null) {
            localStorage.setItem('token', response.token)

           this.userService.findUserByEmail(loginDTO.email).subscribe(userResponse => {
             localStorage.setItem('currentUser', JSON.stringify(userResponse))
             this.anagService.findAnagByEmail(userResponse.email).subscribe(x => {
               localStorage.setItem('currentAnag',JSON.stringify(x))

               this.router.navigate(['/home'])
                 .then(() => {
                   window.location.reload();
                 });
             })

           })


         }

      },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Dati non corretti.',
            text: 'I dati inseriti non sono corretti.'
          });
        })
    } else {
        Swal.fire({
          icon: 'error',
          title: 'Dati non corretti.',
          text: 'I dati inseriti non sono corretti.'
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
     this.router.navigate(['/login/recupera-password'])
   }


}
