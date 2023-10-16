import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDTO} from "../dto/userdto";
import {AnagDTO} from "../dto/anagdto";
import {ChatDTO} from "../dto/chatdto";
import {MessageDTO} from "../dto/messagedto";
import {MessageResponseDTO} from "../dto/messageresponsedto";

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  type: string ='';
  port: string = '8080';

  // @ts-ignore
  public mostraFriendsBar: boolean;


  // @ts-ignore
  public mostraChat: boolean;


  // @ts-ignore
  public userRicevitore: UserDTO;

  // @ts-ignore
  public anagRicevitore: AnagDTO;
  constructor(protected http: HttpClient) {
    this.type = 'chat';
  }

  getAllMessagesByChat(dto: ChatDTO): Observable<MessageDTO[]> {
    return this.http.post<MessageDTO[]>('http://localhost:8082/message/getAllMessagesByChat', dto);
  }

  findChatByNome(nome: string): Observable<ChatDTO> {
    return this.http.get<ChatDTO>('http://localhost:8082/message/findChatByNome?nome='+nome)
  }

  checkChatExist(to: string): Observable<ChatDTO> {
    return this.http.get<ChatDTO>('http://localhost:8082/message/checkChatExist?to='+to)
  }

  findPagesByChat(nomeChat: string, page: number): Observable<MessageResponseDTO> {
    return this.http.get<MessageResponseDTO>('http://localhost:8082/message/findPagesByChat?nomeChat='+nomeChat+'&page='+page)
  }

  findNumberPages(nomeChat: String): Observable<number>{
    return this.http.get<number>('http://localhost:8082/message/findNumberPages?nomeChat='+nomeChat)
  }
}
