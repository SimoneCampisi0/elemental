import {UserDTO} from "./userdto";

export class PostDTO {
  idPost: number

  dataPost: Date

  contenuto: string

  likes: number

  imgURL: string

  user: UserDTO

  constructor(idPost: number,

  dataPost: Date,

  contenuto: string,

  likes: number,

  imgURL: string,

  user: UserDTO) {
    this.idPost = idPost
    this.dataPost = dataPost
    this.contenuto = contenuto
    this.likes = likes
    this.imgURL = imgURL
    this.user = user
  }
}
