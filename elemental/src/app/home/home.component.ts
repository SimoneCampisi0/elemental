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
  //@ts-ignore
  public screenUpResolution: boolean;

  constructor (public chatService: ChatService) {}

  ngOnInit() {
    console.log("JWT: "+localStorage.getItem('token'))
    console.log("USER: "+localStorage.getItem('currentUser'))
    this.screenUpResolution = true;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenWidth = window.innerWidth
    this.screenHeight = window.innerHeight

    if(this.screenWidth < 1300) {
      this.screenUpResolution = false
    } else {
      this.screenUpResolution = true
    }
  }


}
