export class MessageDTO {

  private _id: string | undefined

  text: string

  date: Date

  idUser1: number

  idUser2: number

  nomeChat: string

  constructor(text: string,

  date: Date,

  idUser1: number,

  idUser2: number,

  nomeChat: string) {
    this.text = text
    this.date = date
    this.idUser1 = idUser1
    this.idUser2 = idUser2
    this.nomeChat = nomeChat
  }

  set id(value: string) {
    this._id = value;
  }

  get id(): string {
    return <string>this._id;
  }
}
