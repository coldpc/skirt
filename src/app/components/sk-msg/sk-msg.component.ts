import {Component, Input, OnInit} from '@angular/core';
import {SkMsgInterface} from './SkMsgInterface';

@Component({
  selector: 'app-sk-msg',
  templateUrl: './sk-msg.component.html',
  styleUrls: ['./sk-msg.component.scss']
})
export class SkMsgComponent implements OnInit {
  @Input() msgInfo: SkMsgInterface;
  constructor() { }

  ngOnInit() {
  }

}
