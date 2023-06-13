import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {UserService} from "../../../service/user.service";
import {UserDTO} from "../../../dto/userdto";
import Swal from 'sweetalert2';
import {AnagDTO} from "../../../dto/anagdto";
import {AnagService} from "../../../service/anag.service";
import {LoginDTO} from "../../../dto/logindto";
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import {FotoRequestDTO} from "../../../dto/fotorequestdto";
import {FotoService} from "../../../service/foto.service";
import {RegisterRequestDTO} from "../../../dto/registerrequestdto";


 @Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
   selectFile: boolean = false;
   registerForm: FormGroup;
   base64Image: string = ''
   // loginDTO: LoginDTO;

  constructor(private userService: UserService, private anagService: AnagService, private router: Router, private http: HttpClient, private fotoService: FotoService) {
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

    let registerRequestDTO = new RegisterRequestDTO(email, password)
    if(this.selectFile && nome !== "" && cognome !== "" && dataNascita !== "" && cittaResidenza !== "" && email !== ""  && password !== "") {
      this.userService.register(registerRequestDTO).subscribe(tokenDTO => {
        localStorage.setItem('token', tokenDTO.token)
        this.userService.findUserByEmail(email).subscribe(userInsert => {
          localStorage.setItem("currentUser",JSON.stringify(userInsert))

          let anag = new AnagDTO(0, nome, cognome, dataNascita, cittaResidenza, '',userInsert)
          this.anagService.insert(anag).subscribe(x => {
            localStorage.setItem("currentAnag", JSON.stringify(x))
            this.uploadFile(userInsert)

            this.router.navigate(['/home'])
          })
        })
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Errore nel caricamento',
        text: 'Inserisci correttamente i dati.'
      });
    }


  }

   onFileSelected(event: any) {
     const files: FileList = event.target.files;

     if (files.length > 0) {
       const file: File = files[0];

       const reader = new FileReader();
       reader.onload = () => {
         this.base64Image = reader.result as string;
         console.log("base64Image: " + this.base64Image);
       };

       this.selectFile = true;
       reader.readAsDataURL(file);
     } else {
       // Nessun file selezionato
       // Esegui le azioni desiderate o mostra un messaggio di errore
       console.log("Nessun file selezionato");
     }
   }



   uploadFile(userDef: UserDTO) {
     let dto = new FotoRequestDTO(this.base64Image, userDef)
     this.fotoService.insertFoto(dto).subscribe()
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
