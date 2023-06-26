import { Component } from '@angular/core';
import {UserDTO} from "../../../../dto/userdto";
import {ChatService} from "../../../../service/chat.service";
import {AnagDTO} from "../../../../dto/anagdto";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  // @ts-ignore
  userTemp: UserDTO

  // @ts-ignore
  anagTemp: AnagDTO
  constructor(public chatService: ChatService) {
  }
  ngOnInit(){
    this.userTemp = this.chatService.userRicevitore;
    this.anagTemp = this.chatService.anagRicevitore;
    console.log("emailUsetTemp: "+this.userTemp.email)
  }
}
