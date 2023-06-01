import { Component } from '@angular/core';
import Swal from "sweetalert2";
import {PostDTO} from "../../../dto/postdto";
import {UserDTO} from "../../../dto/userdto";
import {PostService} from "../../../service/post.service";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {

  // @ts-ignore
  user: UserDTO


  constructor(private postService: PostService) {
  }

  ngOnInit() {
    // @ts-ignore
    this.user = JSON.parse(localStorage.getItem('currentUser'))
  }


  // Funzione per mostrare l'alert e ottenere i dati del nuovo post
  showNewPostAlert() {
    Swal.fire({
      title: 'Nuovo post',
      html:
        '<h2 style="margin: 0px">Contenuto</h2>'+
        '<textarea id="input-content" name="content" cols="40" rows="5" style="padding: 1em;"></textarea>\n',
      focusConfirm: false,
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

        this.postService.insert(newPost).subscribe()
        this.refreshPage()
      }
    });
  }

  refreshPage() {
    window.location.reload();
  }

}
