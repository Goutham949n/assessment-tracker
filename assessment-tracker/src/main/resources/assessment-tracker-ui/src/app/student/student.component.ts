import { Component, OnInit } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import * as $ from 'jquery';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  ngOnInit() {
  }

  private serverUrl = 'http://localhost:8080/socket'
  private stompClient;
  q1Ans :string ='';
  q2Ans :string ='';
  q3Ans :string ='';


  constructor(){
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection(){
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/chat", (message) => {
        if(message.body) {
          $(".chat").append("<div class='message'>"+message.body+"</div>")
          console.log(message.body);

          if(that.q1Ans === '') {
              that.q1Ans = message.body == 'q1Correct' ? 'Correct Answer' : '';
          }
            if(that.q2Ans === '') {
              that.q2Ans = message.body === 'q2Correct' ? 'Correct Answer' : '';
          }
          if(that.q3Ans === '') {
            that.q3Ans = message.body === 'q3Correct' ? 'Correct Answer' : '';
        }
        }
      });
    });
  }

  sendMessage(message){
    this.stompClient.send("/app/send/message/student" , {}, message);
  }


}
