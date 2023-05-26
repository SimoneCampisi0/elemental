import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {UserService} from "../../../service/user.service";
import {UserDTO} from "../../../dto/userdto";
import Swal from 'sweetalert2';
import {AnagDTO} from "../../../dto/anagdto";
import {AnagService} from "../../../service/anag.service";
import {LoginDTO} from "../../../dto/logindto";
import {Router} from "@angular/router";

 @Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
   registerForm: FormGroup;
  // loginDTO: LoginDTO;

  constructor(private userService: UserService, private anagService: AnagService, private router: Router) {
    this.registerForm = new FormGroup({
      nome: new FormControl(''),
      cognome: new FormControl(''),
      dataNascita: new FormControl(''),
      cittaResidenza: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  ngOnInit() {

  }

  onSubmit() {
    let nome = this.registerForm.get('nome')?.value
    let cognome = this.registerForm.get('cognome')?.value
    let dataNascita = this.registerForm.get('dataNascita')?.value
    let cittaResidenza = this.registerForm.get('cittaResidenza')?.value
    let email = this.registerForm.get('email')?.value;
    let password = this.registerForm.get('password')?.value;

    let userDTO: UserDTO = new UserDTO(0, email, password)

    this.userService.insert(userDTO).subscribe(insertedUser => {
      localStorage.setItem('currentUser', JSON.stringify(insertedUser));

      this.userService.login(userDTO).subscribe(loggedInUser => {
        localStorage.setItem('currentUser', JSON.stringify(loggedInUser));

        // @ts-ignore
        let userDef: UserDTO = JSON.parse(localStorage.getItem('currentUser'));

        let anag: AnagDTO = new AnagDTO(0, nome, cognome, dataNascita, cittaResidenza, userDef)
        this.anagService.insert(anag).subscribe(anagDef => {
          this.anagService.findAnagByEmail(userDef.email).subscribe(anagDef1 => {
            localStorage.setItem('currentAnag',JSON.stringify(anagDef1))
            this.router.navigate(['/home'])
          })
        })
      });
    });
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

   changePage() {
     this.router.navigate(['/login'])
   }

}
