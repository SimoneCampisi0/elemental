import {UserDTO} from "./userdto";
import {Genere} from "./genere";

export class AnagDTO {
  idAnag: number

  nome: string

  cognome: string

  dataNascita: Date

  cittaResidenza: string

  descrizione: string

  genere: Genere

  user: UserDTO
  constructor(idAnag: number, nome: string, cognome: string, dataNascita: Date, cittaResidenza: string, descrizione: string, genere: Genere, user: UserDTO) {
    this.idAnag = idAnag;
    this.nome = nome;
    this.cognome = cognome;
    this.dataNascita = dataNascita;
    this.cittaResidenza = cittaResidenza;
    this.descrizione = descrizione;
    this.genere = genere;
    this.user = user;
  }
}

