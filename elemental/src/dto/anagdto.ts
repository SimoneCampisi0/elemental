import {UserDTO} from "./userdto";

export class AnagDTO {
  idAnag: number

  nome: string

  cognome: string

  dataNascita: Date

  cittaResidenza: string

  descrizione: string

  user: UserDTO
  constructor(idAnag: number, nome: string, cognome: string, dataNascita: Date, cittaResidenza: string, descrizione: string, user: UserDTO) {
    this.idAnag = idAnag;
    this.nome = nome;
    this.cognome = cognome;
    this.dataNascita = dataNascita;
    this.cittaResidenza = cittaResidenza;
    this.descrizione = descrizione;
    this.user = user;
  }
}

