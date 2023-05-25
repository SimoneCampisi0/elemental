export class UserDTO {

   id_user: number;

  email: string;

   password: string;

  constructor(id_user: number, email: string, password: string) {
     this.id_user = id_user;
     this.email = email;
     this.password = password;
   }
}

