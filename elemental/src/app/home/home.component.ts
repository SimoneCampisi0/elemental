import { Component } from '@angular/core';
import { ChatService } from 'src/service/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor (public chatService: ChatService) {}

  ngOnInit() {
    console.log("JWT: "+localStorage.getItem('token'))
    console.log("USER: "+localStorage.getItem('currentUser'))
  }
}
