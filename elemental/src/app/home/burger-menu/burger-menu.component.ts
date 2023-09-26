import { Component } from '@angular/core';
import { ChatService } from 'src/service/chat.service';

@Component({
  selector: 'app-burger-menu',
  templateUrl: './burger-menu.component.html',
  styleUrls: ['./burger-menu.component.css']
})
export class BurgerMenuComponent {
  constructor() {

  }

  displayFriendChatMenu() {
    console.log("clickMenu");

  }

}
