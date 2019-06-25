import { Component, OnInit } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import * as $ from 'jquery';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-evaluator',
  templateUrl: './evaluator.component.html',
  styleUrls: ['./evaluator.component.css']
})
export class EvaluatorComponent implements OnInit {

  ngOnInit() {
  }

  private serverUrl = 'http://localhost:8080/socket'
  private stompClient;
  data: string;
  q1Yes: boolean = false;
  q1No: boolean = false;
  q2Yes: boolean = false;
  q2No: boolean = false;
  q3Yes: boolean = false;
  q3No: boolean = false;


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
          that.data  = message.body;
          if(!that.q1Yes) {
              that.q1Yes = true ? that.data === 'q1Yes' : false;
          }
          if(!that.q1No) {
            that.q1No = true ? that.data === 'q1No' : false;
          }
          if(!that.q2Yes) {
            that.q2Yes = true ? that.data === 'q2Yes' : false;
          }
          if(!that.q2No) {
            that.q2No = true ? that.data === 'q2No' : false;
          }
          if(!that.q3Yes) {
            that.q3Yes = true ? that.data === 'q3Yes' : false;
          }
          if(!that.q3No) {
            that.q3No = true ? that.data === 'q3No' : false;
          }

        }
      });
    });
  }


  sendAnswer(message){
    console.log(message);
    this.stompClient.send("/app/send/message/evaluator" , {}, message);
    $('#input').val('');
  }

  sendMessage(message){
    console.log(message);
    this.stompClient.send("/app/send/message/evaluator" , {}, message);
    $('#input').val('');
  }

}
