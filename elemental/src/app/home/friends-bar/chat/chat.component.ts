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
      webSocketFactory: () => new SockJS('http://localhost:8080/message/chat'),
      onConnect: () => {

        console.log('Connected to WebSocket');

        // @ts-ignore
        this.user1 = JSON.parse(localStorage.getItem('currentUser'))
        this.user2 = this.chatService.userRicevitore;
        this.anagTemp = this.chatService.anagRicevitore;
        // console.log("emailUsetTemp: "+this.user2.email)

        if (this.user1.id < this.user2.id) {
          this.channelName = this.user1.id + "e" +this.user2.id
        } else {
          this.channelName = this.user2.id + "e" +this.user1.id
        }

        this.chatService.findChatByNome(this.channelName).subscribe(x => {
          if (x!== null) {
            this.chatTemp = x
            // console.log("chatTrovata: "+x.idChat)


            this.chatService.findNumberPages(x.idChat).subscribe(numPagTot => {
              this.nTotPage = numPagTot
              this.currentPage = this.nTotPage - 1
              this.chatService.findPagesByChat(x.idChat, this.currentPage).subscribe(response => {


                this.listaMessaggi = response.messages

                if (this.listaMessaggi.length < 15) {
                  this.currentPage = this.currentPage - 1
                  this.loadMoreMessages();
                }


                // console.log("pagina attuale in seguito ngOnInit(): "+this.currentPage) //CANCELLARE

                this.stompClient.subscribe('/topic/messages/' + this.channelName, (message) => {
                  // Aggiungi il nuovo messaggio alla lista dei messaggi
                  // console.log("Messaggio in arrivo: "+JSON.parse(message.body).text)
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
                  // console.log("Messaggio in arrivo: "+JSON.parse(message.body).text)
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
      // console.log("setScroll")
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
      // console.log("setScroll")
    }, 100);
  }

  onScroll(event: Event): void { //RIVEDERE. La scroll bar non deve raggiungere la posizione top, ma deve rimanere dov'è
    // let target = event.target as HTMLElement
    // console.log("posizione scroll y: "+target.scrollTop)
    //
    // if(target.scrollTop == 0) {
    //   if (this.currentPage >= 0) {
    //     if(this.messRestantiInPage != 0) { //se esistono ancora dei messaggi restanti dal primo caricamento
    //       console.log("messRestantiInPage: "+this.messRestantiInPage)
    //
    //       let tempArray = new Array<MessageDTO>()
    //       this.chatService.findPagesByChat(this.chatTemp.idChat, this.currentPage).subscribe(response => {
    //         for (let i = this.messRestantiInPage; i>= 0; i--) { //trovo i messaggi restanti e li carico
    //           tempArray[i] = response.messages[i]
    //         }
    //
    //         this.listaMessaggi = [...tempArray, ...this.listaMessaggi]
    //       })
    //     } else { //caricamento dei messaggi dopo il primo caricamento. Quindi se ci sono altre pagine
    //
    //     }
    //   }
    // }

    let target = event.target as HTMLElement
    // console.log("posizione scroll y: "+target.scrollTop)

    if(target.scrollTop == 0) {
      if (this.currentPage >= 0) {
        if(this.messRestantiInPage != 0) {
          let tempArr = new Array<MessageDTO>()
          // console.log("Messaggi restati dopo lo scroll: "+this.messRestantiInPage)
          this.chatService.findPagesByChat(this.chatTemp.idChat, this.currentPage).subscribe(response => {

            let tMessRim = this.messRestantiInPage

            for (let i = this.messRestantiInPage - 1; i>=0; i--) {
              // console.log("msg: "+response.messages[i].text)
              tempArr[i] = response.messages[i]
              tMessRim--
            }
            this.listaMessaggi = [ ...tempArr, ...this.listaMessaggi]
            this.messRestantiInPage = tMessRim
            console.log("currentPage: "+this.currentPage + " messRimasti: "+this.messRestantiInPage)

            target.scrollTop = 2
          })

        } else { //caso in cui venga caricata tutta la pagina, composta da 15 messaggi
          if (this.currentPage != 0) {
            // console.log("pagina attuale: "+this.currentPage)
            this.currentPage--
            this.chatService.findPagesByChat(this.chatTemp.idChat, this.currentPage).subscribe(response => {
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

    this.chatService.findPagesByChat(this.chatTemp.idChat, this.currentPage).subscribe(response => {

      let differenzaMess = response.messages.length-1 - this.messRestanti

      // console.log("lunghezza dell'array response: "+response.messages.length+" lunghezza dei messaggi restanti che mancano: "+this.messRestanti)


      for(let i = response.messages.length-1; i >= differenzaMess; i--) {
      // for(let i = response.messages.length-1; i >= this.messRestanti; i--) {
        tempArray[k] = response.messages[i]
        k++
        // console.log("responseMessages["+i+"]: "+response.messages[i].text)
      }
      tempArray.reverse()
      this.listaMessaggi = [...tempArray, ...this.listaMessaggi]

      this.messRestantiInPage = 15 - k
      // console.log("messRestantiInPage"+this.messRestantiInPage)
    })
  }
}



