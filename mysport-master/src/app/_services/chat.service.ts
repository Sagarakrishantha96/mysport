import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  socket;

  constructor() { }

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);
  }

  sendMessage(msg) {
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.socket.emit('my message', msg);
  }

  getMessage() {
    this.socket = io(environment.SOCKET_ENDPOINT);
    return Observable.create((observer) => {
      this.socket.on('my broadcast', (message) => {
        observer.next(message);
      });
    });
  }

}
