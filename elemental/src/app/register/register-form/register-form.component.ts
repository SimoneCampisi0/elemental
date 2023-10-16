import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from "../../../service/user.service";
import {UserDTO} from "../../../dto/userdto";
import Swal from 'sweetalert2';
import {AnagDTO} from "../../../dto/anagdto";
import {AnagService} from "../../../service/anag.service";
import {Router} from "@angular/router";
import {FotoRequestDTO} from "../../../dto/fotorequestdto";
import {FotoService} from "../../../service/foto.service";
import {RegisterRequestDTO} from "../../../dto/registerrequestdto";
import {Genere} from "../../../dto/genere";
import {LogService} from "../../../service/logservice";


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

  constructor(private router: Router, private fotoService: FotoService, private logService: LogService, private userService: UserService, private anagService: AnagService,  private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      nome: ['', Validators.required],
      cognome: [''],
      dataNascita: [''],
      cittaResidenza: [''],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      genere: ['']
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
    let genere = this.registerForm.get('genere')?.value;
    let genEnum: Genere

    switch (genere) {
      case "Uomo":
        genEnum = Genere.UOMO
        break;
      case "Donna":
        genEnum = Genere.DONNA
        break;
      case "Altro":
        genEnum = Genere.ALTRO
        break;
    }

    let registerRequestDTO = new RegisterRequestDTO(email, password)
    if(this.selectFile && nome !== "" && cognome !== "" && dataNascita !== "" && cittaResidenza !== "" && email !== ""  && password !== "") {
      this.userService.register(registerRequestDTO).subscribe(tokenDTO => {
        localStorage.setItem('token', tokenDTO.token)
        this.userService.findUserByEmail(email).subscribe(userInsert => {
          localStorage.setItem("currentUser",JSON.stringify(userInsert))

          let anag = new AnagDTO(0, nome, cognome, dataNascita, cittaResidenza, '', genEnum, userInsert)
          this.anagService.insert(anag).subscribe(x => {
            localStorage.setItem("currentAnag", JSON.stringify(x))
            this.uploadFile(userInsert)

            this.logService.addLoggedUser(userInsert).subscribe(()=> {
              this.router.navigate(['/home'])
                .then(() => {
                  window.location.reload();
                });
            })
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
       };

       this.selectFile = true;
       reader.readAsDataURL(file);
     } else {
       // Nessun file selezionato
       // Esegui le azioni desiderate o mostra un messaggio di errore
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
