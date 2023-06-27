import { Component } from '@angular/core';
import {UserDTO} from "../../../../dto/userdto";
import {ChatService} from "../../../../service/chat.service";
import {AnagDTO} from "../../../../dto/anagdto";
import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client'
import {FormControl} from "@angular/forms";
import {Observable, of} from "rxjs";
import {MessageDTO} from "../../../../dto/messagedto";
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  // @ts-ignore

  channelName: string

  // @ts-ignore
  user1: UserDTO

  // @ts-ignore
  user2: UserDTO

  // @ts-ignore
  anagTemp: AnagDTO

  // messages?: Observable<Array<MessageDTO>>;

  // @ts-ignore
  newMessage= new FormControl('')

  url = 'http://localhost:8080'

  socket?: WebSocket;

  stompClient?: Stomp.Client;

  // @ts-ignore
  listaMessaggi: MessageDTO[]

  constructor(public chatService: ChatService, private http:HttpClient) {
  }
  ngOnInit(){
    // @ts-ignore
    this.user1 = JSON.parse(localStorage.getItem('currentUser'))
    this.user2 = this.chatService.userRicevitore;
    this.anagTemp = this.chatService.anagRicevitore;
    console.log("emailUsetTemp: "+this.user2.email)

    if (this.user1.id < this.user2.id) {
      this.channelName = this.user1.id + "e" +this.user2.id
    } else {
      this.channelName = this.user2.id + "e" +this.user1.id
    }

    this.chatService.findChatByNome(this.channelName).subscribe(x => {
      this.chatService.getAllMessagesByChat(x).subscribe(y=> {
        this.listaMessaggi = y
      })
    })

    // this.chatService.getAllMessagesByChat()
    // this.connectToChat()
  }
  // loadChat() {
  //   this.messages = this.http.post<Array<MessageDTO>>(this.url+'/getMessages' ,  this.channelName);
  //   this.messages.subscribe(x => {
  //     let mgs:Array<MessageDTO> = x
  //     mgs.sort((a, b) => (a.id > b.id) ? 1 : -1)
  //     this.messages = of(mgs);
  //   })
  //   console.log(this.messages);
  // }
  // // connectToChat() {
  // //   this.channelName = this.user1.id + ' & '+ this.user2.id
  // //   this.loadChat()
  // //
  // //   console.log('connessione alla chat...')
  // //   this.socket = new SockJS(this.url + '/message/chat');
  // //   this.stompClient = Stomp.Stomp.over(this.socket);
  // //
  // //   this.stompClient.connect({}, (frame) => {
  // //     //func = what to do when connection is established
  // //     console.log('connected to: ' + frame);
  // //     this.stompClient!.subscribe(
  // //       '/topic/messages/' + this.channelName,
  // //       (response) => {
  // //         //func = what to do when client receives data (messages)
  // //         this.loadChat();
  // //       }
  // //     );
  // //   });
  // // }
  //
  // connectToChat() { //NON DEPRECATO
  //   this.channelName = this.user1.id + ' & ' + this.user2.id;
  //   this.loadChat();
  //
  //   console.log('connessione alla chat...');
  //   const socket = new SockJS(this.url + '/message/chat');
  //
  //   this.stompClient = Stomp.Stomp.over(() => socket);
  //   this.stompClient.configure({
  //     onConnect: (frame) => {
  //       console.log("connected to " + frame);
  //       // @ts-ignore
  //       this.stompClient.subscribe(
  //         "/topic/messages/" + this.channelName,
  //         (response) => {
  //           // func = what to do when client receives data (messages)
  //           this.loadChat();
  //         }
  //       );
  //     },
  //     debug:(str)=>{console.log(str)}
  //   });
  //
  //   // utilizza activate al posto di connect
  //   this.stompClient.activate();
  // }
}
