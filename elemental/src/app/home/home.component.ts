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

  //@ts-ignore
  public clickMenu: boolean;

  constructor (public chatService: ChatService) {}

  ngOnInit() {
    console.log("JWT: "+localStorage.getItem('token'))
    console.log("USER: "+localStorage.getItem('currentUser'))
    this.screenUpResolution = true;
    this.clickMenu = false;

    this.screenWidth = window.innerWidth
    if(this.screenWidth < 1300) {
      this.screenUpResolution = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenWidth = window.innerWidth
    this.screenHeight = window.innerHeight

    if(this.screenWidth < 1300 && this.clickMenu == false) {
      this.screenUpResolution = false
    }
    if (this.screenWidth >= 1300){
      this.screenUpResolution = true
    }
  }

  setClick() {
    switch (this.clickMenu) {
      case true:
        this.clickMenu = false;
        break;
      case false:
        this.clickMenu = true;
        break;
    }
  }

  openChatMenu() {
    this.setClick()
    switch (this.clickMenu) {
      case true:
        this.screenUpResolution = true
        break;

      case false:
        this.screenUpResolution = false;
        break;
    }
  }


}
