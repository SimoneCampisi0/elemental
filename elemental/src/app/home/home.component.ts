import { Component, HostListener } from '@angular/core';
import { ChatService } from 'src/service/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public screenWidth: any
  public screenHeight: any

  constructor (public chatService: ChatService) {}

  ngOnInit() {
    console.log("JWT: "+localStorage.getItem('token'))
    console.log("USER: "+localStorage.getItem('currentUser'))
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenWidth = window.innerWidth
    this.screenHeight = window.innerHeight

    console.log("this.screenWidth:",this.screenWidth);
  }


}
