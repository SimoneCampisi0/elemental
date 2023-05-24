import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  loginForm: FormGroup;

  constructor() {
    this.loginForm = new FormGroup({
      nome: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  onSubmit() {
/*     const nome = this.loginForm.get('nome')?.value;
 */  }
}
