import { Injectable } from '@angular/core';
import {observable, Observable} from 'rxjs';
import 'rxjs/Rx';
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  ws: WebSocket;
  constructor() { }

  creatObservableSocket(url: string , id: number): Observable<any> {
    this.ws = new WebSocket(url);
    return new Observable(
      observer => {
        this.ws.onmessage = (event) => observer.next(event.data);
        this.ws.onerror = (event) => observer.error(event);
        this.ws.onclose = (event) => observer.complete();
        this.ws.onopen = (event) => this.sendMessage({productId: id});
        return () => this.ws.close();  // 会在取消关注的时候执行
      }
    ).map(message => {
      if (typeof message === 'string') {
        return JSON.parse(message);
      } else {
        return message;
      }
    });
  }
  sendMessage(message: any) {
    this.ws.send(JSON.stringify(message));
  }
}
