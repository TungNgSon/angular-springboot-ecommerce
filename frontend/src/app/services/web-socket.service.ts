import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient!: Client;
  public productCount$ = new BehaviorSubject<number>(0);

  constructor() {
    this.connect();
  }

  connect() {
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      onConnect: () => {
        // Không subscribe mặc định ở đây nữa
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      }
    });

    this.stompClient.activate();
  }

  // Đăng ký topic động cho product count
  subscribeProductCount(topic: string, callback: (count: number) => void) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.subscribe(topic, (message: IMessage) => {
        const count = Number(message.body);
        callback(count);
      });
    } else {
      // Nếu chưa kết nối, chờ kết nối xong rồi subscribe
      const interval = setInterval(() => {
        if (this.stompClient && this.stompClient.connected) {
          this.stompClient.subscribe(topic, (message: IMessage) => {
            const count = Number(message.body);
            callback(count);
          });
          clearInterval(interval);
        }
      }, 500);
    }
  }
}
