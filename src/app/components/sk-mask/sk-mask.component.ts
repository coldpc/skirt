import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sk-mask',
  templateUrl: './sk-mask.component.html',
  styleUrls: ['./sk-mask.component.scss']
})
export class SkMaskComponent implements OnInit {
  @Output() tapBack: EventEmitter <any> = new EventEmitter <any>();
  constructor() { }

  ngOnInit() {
  }

  onTap(e){
    this.tapBack.emit(e);
  }
}
