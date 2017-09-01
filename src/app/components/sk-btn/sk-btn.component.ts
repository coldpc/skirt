import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-sk-btn',
  templateUrl: './sk-btn.component.html',
  styleUrls: ['./sk-btn.component.scss']
})

export class SkBtnComponent implements OnInit {
  @Input() label: string;
  @Input() width: string;
  @Input() disabled: Boolean;

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

}
