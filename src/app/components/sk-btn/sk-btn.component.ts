import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-sk-btn',
  templateUrl: './sk-btn.component.html',
  styleUrls: ['./sk-btn.component.scss'],
  providers: []
})

export class SkBtnComponent implements OnInit {
  @Input() label: string;
  @Input() width: string;
  @Input() disabled: Boolean;
  @Output() touch: EventEmitter<Object> = new EventEmitter();

  className = '';


  constructor() { }

  ngOnInit() {
  }

  touchStart() {
    this.className = "sk-hvr";
  }
  endHover() {
    this.className = "";
  }

  onTap(e) {
    this.touch.emit(e);
  }
}
