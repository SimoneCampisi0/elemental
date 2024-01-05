import { Component } from '@angular/core';
import Swal from "sweetalert2";
import {PostDTO} from "../../../dto/postdto";
import {UserDTO} from "../../../dto/userdto";
import {PostService} from "../../../service/post.service";
import {LogService} from "../../../service/logservice";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {

  // @ts-ignore
  user: UserDTO


  constructor(private postService: PostService, private logManager: LogService) {
  }

  ngOnInit() {
    // @ts-ignore
    this.user = JSON.parse(localStorage.getItem('currentUser'))

    this.logManager.getLoggedUsers().subscribe(usersList => {
      console.log(usersList)
    })

  }


  // Funzione per mostrare l'alert e ottenere i dati del nuovo post
  showNewPostAlert() {
    Swal.fire({
      title: '',
      html:
        '<h2 style="margin: 0px; margin-bottom: 1em;">Pubblica il nuovo post: </h2>'+
        '<textarea id="input-content" name="content" cols="40" rows="5" style="padding: 1em;"></textarea>\n',
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonText: 'Annulla',
      confirmButtonColor: '#5394F6',
      preConfirm: () => {

        // @ts-ignore
        const content = Swal.getPopup().querySelector('#input-content').value;


        // Crea un oggetto PostDTO con i dati inseriti dall'utente
        const newPost = new PostDTO(
          0, // Inizializza i likes a 0,
          0,
          new Date(), // Utilizza la data corrente come data del post
          content,
          '...',
          this.user
        );

        this.postService.insert(newPost).subscribe(
          () =>  {},

          () => {},

          () => {
            this.refreshPage()
          }
        )

      }
    });
  }

  refreshPage() {
    window.location.reload();
  }

}
