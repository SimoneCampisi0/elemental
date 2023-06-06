import {UserDTO} from "./userdto";
import {PostDTO} from "./postdto";

export class InterazioneDTO {
  id: number

  likes: number

  user: UserDTO

  post: PostDTO

  constructor(
  id: number,

  likes: number,

  user: UserDTO,

  post: PostDTO,
  ) {
    this.id = id
    this.likes = likes
    this.user = user
    this.post = post
  }
}
