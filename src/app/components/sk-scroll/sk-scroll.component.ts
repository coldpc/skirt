import { Component, OnInit, Input, Output } from '@angular/core';

declare var window: any;

export interface TouchData {
  x0: number;
  y0: number;
  xt: number;
  yt: number;
  dy: number;
  dx: number;
}

export interface ScrollData {
  target?: HTMLDivElement;
  event?: any;
  scrollY?: number;
  scrollX?: number;
  scrollHeight?: number;
  scrollWidth?: number;
  height?: number;
  width?: number;
}

const pullDownMaxDistance = 100;

@Component({
  selector: 'app-sk-scroll',
  templateUrl: './sk-scroll.component.html',
  styleUrls: ['./sk-scroll.component.scss']
})
export class SkScrollComponent implements OnInit {
  @Input() direct: string; // x, y 默认y
  @Input() pullDownMaxDistance = pullDownMaxDistance;

  scrollData: ScrollData = {
    scrollY: 0
  }; // 滚动跳的数据
  position: string;

  pullDownDistance = 0; //下拉距离

  touchData: TouchData = {
    x0: 0,
    y0: 0,
    xt: 0,
    yt: 0,
    dy: 0,
    dx: 0
  };
  constructor() { }

  ngOnInit() {
  }

  onScrollContent(e) {
    const target = e.target;
    const scrollData = this.scrollData;
    scrollData.target  =target;
    scrollData.height = target.offsetHeight;
    scrollData.scrollHeight = target.scrollHeight;
    scrollData.scrollY = target.scrollTop;
    scrollData.event = e;
  }

  onTouchStartWrapper(e) {
    const touch = e.touches[0];
    const touchData = this.touchData;
    touchData.y0 = touch.clientY;
  }

  onTouchMoveWrapper(e) {
    this.position = 'move';
    const touch = e.touches[0];
    const touchData = this.touchData;
    touchData.yt = touch.clientY;
    touchData.dy = touchData.yt - touchData.y0;
    touchData.y0 = touchData.yt;

    if (touchData.dy > 0 && this.scrollData.scrollY < 3) {
      this.stopPropagation(e);
      this.countPullDownDistance(touchData.dy);
    }
  }

  stopPropagation(e) {
    e.stopPropagation();
    if (e.cancelable && !e.defaultPrevented) {
      e.preventDefault();
    }
  }

  // 计算下拉的距离
  countPullDownDistance(dy) {
    let distance  = dy * (pullDownMaxDistance - this.pullDownDistance ) / pullDownMaxDistance;
    this.pullDownDistance += distance;
    console.log( this.pullDownDistance);
  }

  // touch结束
  onTouchEnd() {
    if (this.pullDownDistance > 0){
      this.pullDownDistance = 0;
    }
  }
}
