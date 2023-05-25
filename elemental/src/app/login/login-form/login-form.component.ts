import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {UserService} from "../../../service/user.service";
import {LoginDTO} from "../../../dto/logindto";
import {UserDTO} from "../../../dto/userdto";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  loginForm: FormGroup;
  // loginDTO: LoginDTO;

  constructor(private userService: UserService) {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  ngOnInit() {

  }

  onSubmit() {
/*     const nome = this.loginForm.get('nome')?.value;

 */
    let email = this.loginForm.get('email')?.value;
    let password = this.loginForm.get('password')?.value;
    console.log("EMAIL: ",email)
    console.log("PASSWORD: ",password)

    let loginDTO = new LoginDTO(email, password)

    this.userService.login(loginDTO).subscribe(userGet => {
      if(userGet != null) {
        let user: UserDTO = new UserDTO(userGet.id, userGet.email, userGet.password)
        localStorage.setItem("currentUser", JSON.stringify(user))
      }
    })
  }
}
