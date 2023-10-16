import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {UserDTO} from "../../../../dto/userdto";
import {ChatService} from "../../../../service/chat.service";
import {AnagDTO} from "../../../../dto/anagdto";
import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client'
import {FormControl} from "@angular/forms";
import {MessageDTO} from "../../../../dto/messagedto";
import {HttpClient} from "@angular/common/http";
import {Client} from "@stomp/stompjs";
import {ChatDTO} from "../../../../dto/chatdto";
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  messRestanti = 0;

  messRestantiInPage = 0;

  nTotPage: number = 0;

  // @ts-ignore

  currentPage: number = 0;

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
      webSocketFactory: () => new SockJS('http://localhost:8082/message/chat'),
      onConnect: () => {

        // @ts-ignore
        this.user1 = JSON.parse(localStorage.getItem('currentUser'))
        this.user2 = this.chatService.userRicevitore;
        this.anagTemp = this.chatService.anagRicevitore;

        if (this.user1.id < this.user2.id) {
          this.channelName = this.user1.id + "e" +this.user2.id
        } else {
          this.channelName = this.user2.id + "e" +this.user1.id
        }

        this.chatService.findChatByNome(this.channelName).subscribe(x => {
          if (x!== null) {
            this.chatTemp = x

            this.chatService.findNumberPages(x.nomeChat).subscribe(numPagTot => {
              this.nTotPage = numPagTot

              if(this.nTotPage > 0) {
                this.currentPage = this.nTotPage - 1
              } else {
                this.currentPage = this.nTotPage
              }
              this.chatService.findPagesByChat(x.nomeChat, this.currentPage).subscribe(response => {

                this.listaMessaggi = response.messages

                if (this.listaMessaggi.length < 15) {
                  if (this.currentPage > 0) {
                    this.currentPage = this.currentPage - 1
                    this.loadMoreMessages();
                  }

                }

                this.stompClient.subscribe('/topic/messages/' + this.channelName, (message) => {
                  // Aggiungi il nuovo messaggio alla lista dei messaggi
                  this.listaMessaggi.push(JSON.parse(message.body));


                });
              })

            })

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
    setTimeout(() => {
      this.allCardDiv.nativeElement.scrollTop = this.allCardDiv.nativeElement.scrollHeight;
    }, 100);
  }



  goBack() {
    this.chatService.mostraChat = false;
  }


  sendMessage() {
    let text = ' '
    if (this.newMessage?.value!== null) {
      text = this.newMessage.value;
    }
    const message = new MessageDTO(
      text,
      new Date(),
      this.user1.id,
      this.user2.id,
      this.chatTemp.nomeChat
    )

    this.newMessage.setValue('')
    this.stompClient.publish({ destination: '/app/chat/'+this.channelName, body: JSON.stringify(message)}); // Sostituisci "{to}" con il nome del canale corretto

    setTimeout(() => {
      this.allCardDiv.nativeElement.scrollTop = this.allCardDiv.nativeElement.scrollHeight;
    }, 100);
  }

  onScroll(event: Event): void {

    let target = event.target as HTMLElement
    if(target.scrollTop == 0) {
      if (this.currentPage >= 0) {
        if(this.messRestantiInPage != 0) {
          let tempArr = new Array<MessageDTO>()
          this.chatService.findPagesByChat(this.chatTemp.nomeChat, this.currentPage).subscribe(response => {

            let tMessRim = this.messRestantiInPage

            for (let i = this.messRestantiInPage - 1; i>=0; i--) {
              tempArr[i] = response.messages[i]
              tMessRim--
            }
            this.listaMessaggi = [ ...tempArr, ...this.listaMessaggi]
            this.messRestantiInPage = tMessRim
            target.scrollTop = 2
          })

        } else { //caso in cui venga caricata tutta la pagina, composta da 15 messaggi
          if (this.currentPage != 0) {
            this.currentPage--
            this.chatService.findPagesByChat(this.chatTemp.nomeChat, this.currentPage).subscribe(response => {
              this.listaMessaggi = [...response.messages, ...this.listaMessaggi]

              target.scrollTop = 2

            })
          }
        }

      }
    }
  }

  loadMoreMessages() { //Carica i primi 15 messaggi. Li prende dalla pagina precedente
    this.messRestanti = 15 - this.listaMessaggi.length - 1//numero di messaggi da caricare
    this.messRestantiInPage = this.listaMessaggi.length //numero di messaggi non caricati da quella pagina

    let tempArray: MessageDTO[] = new Array<MessageDTO>()
    let k = 0;

    this.chatService.findPagesByChat(this.chatTemp.nomeChat, this.currentPage).subscribe(response => {
      let differenzaMess = response.messages.length-1 - this.messRestanti



      for(let i = response.messages.length-1; i >= differenzaMess; i--) {
        tempArray[k] = response.messages[i]
        k++
        }
      tempArray.reverse()
      this.listaMessaggi = [...tempArray, ...this.listaMessaggi]

      this.messRestantiInPage = 15 - k
    })
  }
}



