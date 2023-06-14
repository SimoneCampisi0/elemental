import { Component } from '@angular/core';
import {UserService} from "../../service/user.service";
import {AnagService} from "../../service/anag.service";
import {UserDTO} from "../../dto/userdto";
import {AnagDTO} from "../../dto/anagdto";
import {FotoService} from "../../service/foto.service";
import {PostService} from "../../service/post.service";
import Swal from "sweetalert2";
import {PostDTO} from "../../dto/postdto";
import {Genere} from "../../dto/genere";

@Component({
  selector: 'app-dettaglio-user',
  templateUrl: './dettaglio-user.component.html',
  styleUrls: ['./dettaglio-user.component.css']
})
export class DettaglioUserComponent {
  genere: string = ''

  base64Img: string = ''

  numAmici = 0

  numPost: number = 0

  // @ts-ignore
  user: UserDTO
  // @ts-ignore
  anag: AnagDTO
  constructor(private fotoService: FotoService, private userService:UserService, private anagService: AnagService, private postService: PostService) {
    // @ts-ignore
    this.user = JSON.parse(localStorage.getItem('currentUser'))
  }
  ngOnInit() {
    this.anagService.findAnagByEmail(this.user.email).subscribe(x => {
      this.anag = x
    })

    this.fotoService.readFoto(this.user.id).subscribe(x=> {
      // @ts-ignore
      this.base64Img = 'data:image/jpeg;base64,' + x; //l'immagine non è un JSON. Angular non riesce a leggerlo
    })

     this.calcoloNumeroPostByUser()

  }

  calcoloNumeroPostByUser() {
     this.postService.calcoloNumeroPostByUser(this.user.id).subscribe(x => {
       this.numPost = x;
     })
  }

  modificaDescr() {
    Swal.fire({
      title: 'Modifica la tua biografia',
      html:
        // '<h2 style="margin: 0px">Modifica la tua biografia</h2>'+
        '<textarea id="input-content" name="content" cols="40" rows="5" style="padding: 1em;"></textarea>\n',
      focusConfirm: false,
      preConfirm: () => {

        // @ts-ignore
        const content = Swal.getPopup().querySelector('#input-content').value;


        // Crea un oggetto PostDTO con i dati inseriti dall'utente
        this.anag.descrizione = content

        this.anagService.update(this.anag).subscribe(x => {
          localStorage.setItem('currentAnag',JSON.stringify(x))
        })

        // this.refreshPage()
      }
    });
  }

  modificaDati() {
    Swal.fire({
      title: 'Modifica i tuoi dati',
      html: `
                    <label class="form-label" for="nome">Nome</label>
                    <input type="text" id="nome" class="swal2-input" placeholder="Nome">

              <label class="form-label" for="cognome">Cognome</label>
              <input type="text" id="cognome" class="swal2-input" placeholder="Cognome">

              <label class="form-label" for="dataNascita">Data di nascita</label>
              <input type="date" id="dataNascita" class="swal2-input" placeholder="">

              <label class="form-label" for="genere">Genere</label>
                      <select id="genere" name="genere" class="swal2-input" style="    margin-left: 2em;
    margin-right: 10em;">
                        <option value=""></option>
                        <option value="Uomo">Uomo</option>
                        <option value="Donna">Donna</option>
                        <option value="Altro">Altro</option>
                      </select>

                 <label class="form-label" for="cittaResidenza">Città</label>
                <input type="text" id="cittaResidenza" class="swal2-input" placeholder="Città">`,
      confirmButtonText: 'Modifica',
      focusConfirm: false,
      preConfirm: () => {
        // @ts-ignore
        const nome = Swal.getPopup().querySelector('#nome')?.value

        // @ts-ignore
        const cognome = Swal.getPopup().querySelector('#cognome')?.value

        // @ts-ignore
        const dataNascita = Swal.getPopup().querySelector('#dataNascita')?.value

        // @ts-ignore
        const genere = Swal.getPopup().querySelector('#genere')?.value

        // @ts-ignore
        const cittaResidenza = Swal.getPopup().querySelector('#cittaResidenza')?.value

        if (!nome || !cognome || !dataNascita || !cittaResidenza) {
          Swal.showValidationMessage(`Inserisci correttamente `)
        }
        return { nome, cognome, dataNascita, genere,cittaResidenza }
      }
    }).then((result) => {
      this.anag.nome = result.value?.nome;
      this.anag.cognome = result.value?.cognome;
      this.anag.dataNascita = result.value?.dataNascita;
      let genere = result.value?.genere
      this.anag.cittaResidenza = result.value?.cittaResidenza;

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

      // @ts-ignore
      this.anag.genere = genEnum;
      this.anagService.update(this.anag).subscribe(x=> {
        localStorage.setItem('currentAnag',JSON.stringify(x))
        this.refreshPage()
      })
    })
  }

  refreshPage() {
    window.location.reload();
  }
}
