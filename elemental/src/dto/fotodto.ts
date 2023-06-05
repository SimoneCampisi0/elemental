import {UserDTO} from "./userdto";

export class FotoDTO {
  idFoto: number

  url: string

  user:UserDTO

  constructor(idFoto: number,

  url: string,

  user:UserDTO) {
    this.idFoto = idFoto;
    this.url = url;
    this.user = user;
  }
}
