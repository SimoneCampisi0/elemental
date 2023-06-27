import {Injectable} from "@angular/core";
import {AbstractService} from "./abstractservice";
import {CommentoDTO} from "../dto/commentodto";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import {UserDTO} from "../dto/userdto";
import {AnagDTO} from "../dto/anagdto";
import {ChatDTO} from "../dto/chatdto";
import {PostDTO} from "../dto/postdto";
import {MessageDTO} from "../dto/messagedto";

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  type: string ='';
  port: string = '8080';

  public mostaChat: boolean = false;

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

}
