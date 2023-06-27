import {UserDTO} from "./userdto";
import {ChatDTO} from "./chatdto";

export class MessageDTO {
  id: number

  text: string

  date: Date

  user1: UserDTO

  user2: UserDTO

  chat: ChatDTO

  constructor(id: number,

  text: string,

  date: Date,

  user1: UserDTO,

  user2: UserDTO,

  chat: ChatDTO) {
    this.id = id
    this.text = text
    this.date = date
    this.user1 = user1
    this.user2 = user2
    this.chat = chat
  }
}
