import {MessageDTO} from "./messagedto";

export class MessageResponseDTO {
  messages: MessageDTO[]

  currentPage: number

  totalPages: number

  totalMessages: number

  constructor(messages: MessageDTO[],

  currentPage: number,

  totalPages: number,

  totalMessages: number) {
    this.messages = messages
    this.currentPage = currentPage
    this.totalPages = totalPages
    this.totalMessages = totalMessages
  }
}
