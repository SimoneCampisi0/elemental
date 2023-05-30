import {Injectable} from "@angular/core";
import {AbstractService} from "./abstractservice";
import {HttpClient} from "@angular/common/http";
import {IterazioneDTO} from "../dto/iterazionedto";

@Injectable({
  providedIn: 'root'
})
export class IterazioneService extends AbstractService<IterazioneDTO>{
  constructor(http: HttpClient) {
    super(http);
    this.type = 'iterazione';
  }

}
