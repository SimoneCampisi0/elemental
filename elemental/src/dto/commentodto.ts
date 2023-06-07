import {UserDTO} from "./userdto";
import {PostDTO} from "./postdto";

export class CommentoDTO {
  id: number

  nomeAutore: string

  contenuto: string

  dataCommento: Date

  user: UserDTO

  post: PostDTO

  constructor(id: number,

  nomeAutore: string,

  contenuto: string,

  dataCommento: Date,

  user: UserDTO,

  post: PostDTO) {
    this.id = id
    this.nomeAutore = nomeAutore
    this.contenuto = contenuto
    this.dataCommento = dataCommento
    this.user = user
    this.post = post
  }
}
