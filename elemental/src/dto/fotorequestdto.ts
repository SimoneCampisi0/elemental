import {UserDTO} from "./userdto";

export class FotoRequestDTO {
  image64: string
  user: UserDTO
  constructor(image64: string, user: UserDTO) {
    this.image64 = image64;
    this.user = user;
  }
}
