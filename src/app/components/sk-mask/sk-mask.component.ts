import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


const maskState = {
  hide: 'inactive',
  show: 'active'
};

@Component({
  selector: 'app-sk-mask',
  templateUrl: './sk-mask.component.html',
  styleUrls: ['./sk-mask.component.scss'],
  animations: [
    trigger('ctrlMask', [
      state('active', style({
        opacity: 0.6
      })),
      state('inactive',   style({
        opacity: 0,
        display: 'none'
      })),
      transition('active => inactive, inactive => active', animate('300ms ease-out'))
    ])
  ]
})

export class SkMaskComponent implements OnInit {
  @Output() hideEvt: EventEmitter <any> = new EventEmitter <any>();
  @Input() ifShow: boolean;

  state = maskState.hide;
  constructor() { }
  ngOnInit() {
    if (this.ifShow) {
      this.show();
    }else {
      this.hide();
    }
  }

  onTap(e) {
    if (this.state === maskState.show) {
      console.log(this.state);
      this.hide();
      this.hideEvt.emit(e);
    }
  }

  show() {
    this.state = maskState.show;
  }

  hide() {
    this.state = maskState.hide;
  }
}
