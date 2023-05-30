import {UserDTO} from "./userdto";

export class PostDTO {
  idPost: number

  likes: number

  dataPost: Date

  contenuto: string

  imgURL: string

  user: UserDTO

  constructor(idPost: number,

  likes: number,

  dataPost: Date,

  contenuto: string,


  imgURL: string,

  user: UserDTO) {
    this.idPost = idPost
    this.likes = likes
    this.dataPost = dataPost
    this.contenuto = contenuto
    this.imgURL = imgURL
    this.user = user
  }
}
