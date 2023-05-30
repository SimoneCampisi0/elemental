import {UserDTO} from "./userdto";
import {PostDTO} from "./postdto";

export class IterazioneDTO {
  id: number

  likes: number

  dataCommento: Date

  contenuto: string

  imgURL: string

  user: UserDTO

  post: PostDTO

  constructor(
  id: number,

  likes: number,

  dataCommento: Date,

  contenuto: string,

  imgURL: string,

  user: UserDTO,

  post: PostDTO,
  ) {
    this.id = id
    this.likes = likes
    this.dataCommento = dataCommento
    this.contenuto = contenuto
    this.imgURL = imgURL
    this.user = user
    this.post = post
  }
}
