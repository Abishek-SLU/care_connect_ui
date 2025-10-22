import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/core/service/service.index';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  message:any;
  text:any;
  constructor(
    public router: Router,
    public commonSerivce: CommonService
  ) {}

  ngOnInit(): void {
    this.commonSerivce.nextmessage('chat');
  }

  ngOnDestroy() {
    this.commonSerivce.nextmessage('');
  }

  send() {
    this.text = this.message;
    this.message = '';
  }
}
