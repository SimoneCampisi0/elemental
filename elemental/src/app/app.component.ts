import { Component } from '@angular/core';
import {TimeoutService} from "../service/timeout.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private timeoutService: TimeoutService) {
  }

  ngOnInit() {

  }


}
