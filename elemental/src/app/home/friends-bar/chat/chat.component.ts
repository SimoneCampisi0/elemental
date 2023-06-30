import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {UserDTO} from "../../../../dto/userdto";
import {ChatService} from "../../../../service/chat.service";
import {AnagDTO} from "../../../../dto/anagdto";
import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client'
import {FormControl} from "@angular/forms";
import {Observable, of} from "rxjs";
import {MessageDTO} from "../../../../dto/messagedto";
import {HttpClient} from "@angular/common/http";
import {Client} from "@stomp/stompjs";
import {ChatDTO} from "../../../../dto/chatdto";
import {DatePipe} from "@angular/common";
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  nTotPage: number = 0;

  // @ts-ignore

  nPage: number = 0;

  // @ts-ignore
  chatTemp: ChatDTO

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

  // @ts-ignore
  stompClient: Stomp.Client;

  // @ts-ignore
  listaMessaggi: MessageDTO[]


  // @ts-ignore
  @ViewChild('allCardDiv') private allCardDiv: ElementRef;

  constructor(public chatService: ChatService, private http:HttpClient) {
  }

  ngOnInit(){
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/message/chat'),
      onConnect: () => {

        console.log('Connected to WebSocket');

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
          if (x!== null) {
            this.chatTemp = x
            console.log("chatTrovata: "+x)


            this.chatService.findNumberPages(x.idChat).subscribe(numPagTot => {
              this.nTotPage = numPagTot
              this.chatService.findPagesByChat(x.idChat, this.nTotPage-1).subscribe(response => {


                this.listaMessaggi = response.messages


                this.stompClient.subscribe('/topic/messages/' + this.channelName, (message) => {
                  // Aggiungi il nuovo messaggio alla lista dei messaggi
                  console.log("Messaggio in arrivo: "+JSON.parse(message.body).text)
                  this.listaMessaggi.push(JSON.parse(message.body));


                });
              })

            })

            // let nPage = ;
            // this.chatService.findPagesByChat(x.idChat, 0).subscribe(response => {
            //
            //
            //   this.listaMessaggi = response.messages
            //
            //
            //   this.stompClient.subscribe('/topic/messages/' + this.channelName, (message) => {
            //     // Aggiungi il nuovo messaggio alla lista dei messaggi
            //     console.log("Messaggio in arrivo: "+JSON.parse(message.body).text)
            //     this.listaMessaggi.push(JSON.parse(message.body));
            //
            //
            //   });
            // })


          } else { //se la chat non esiste, la vado a creare

            let nomeChat = ''
            if (this.user1.id < this.user2.id) {
              nomeChat = this.user1.id + "e" +this.user2.id
            } else {
              nomeChat= this.user2.id + "e" +this.user1.id
            }


            this.chatService.checkChatExist(nomeChat).subscribe(chat=> {
              this.chatService.getAllMessagesByChat(chat).subscribe(y=> {
                this.chatTemp = chat
                this.listaMessaggi = y


                this.stompClient.subscribe('/topic/messages/' + this.channelName, (message) => {
                  // Aggiungi il nuovo messaggio alla lista dei messaggi
                  console.log("Messaggio in arrivo: "+JSON.parse(message.body).text)
                  this.listaMessaggi.push(JSON.parse(message.body));

                });

              })
            })

          }

        })


      },
      onWebSocketError: (error) => {
        console.error('WebSocket connection error:', error);
      }

    });
    this.stompClient.activate();

  }


  ngAfterViewInit() {
    console.log("ngAfterViewInit")
    setTimeout(() => {
      this.allCardDiv.nativeElement.scrollTop = this.allCardDiv.nativeElement.scrollHeight;
      console.log("setScroll")
    }, 100);
  }



  goBack() {
    this.chatService.mostaChat = false;
  }


  sendMessage() {
    let text = ' '
    if (this.newMessage?.value!== null) {
      text = this.newMessage.value;
    }
    const message = new MessageDTO(
      0,
      text,
      new Date(),
      this.user1,
      this.user2,
      this.chatTemp
    )

    this.newMessage.setValue('')
    this.stompClient.publish({ destination: '/app/chat/'+this.channelName, body: JSON.stringify(message)}); // Sostituisci "{to}" con il nome del canale corretto

    setTimeout(() => {
      this.allCardDiv.nativeElement.scrollTop = this.allCardDiv.nativeElement.scrollHeight;
      console.log("setScroll")
    }, 100);
  }

  onScroll(event: Event): void {
    let target = event.target as HTMLElement
    console.log("posizione scroll y: "+target.scrollTop)

    if(target.scrollTop == 0) {
      this.nPage++
      this.chatService.findPagesByChat(this.chatTemp.idChat, this.nPage).subscribe(response => {


        this.listaMessaggi = response.messages


        this.stompClient.subscribe('/topic/messages/' + this.channelName, (message) => {
          // Aggiungi il nuovo messaggio alla lista dei messaggi
          console.log("Messaggio in arrivo: "+JSON.parse(message.body).text)
          this.listaMessaggi.push(JSON.parse(message.body));


        });
      })

    }


  }


}



