import {Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {Timer} from "./Timer";
import {TimerManager} from "./TimerManager";


export interface TouchData {
  x0: number;
  y0: number;
  xt: number;
  yt: number;
  dy: number;
  dx: number;
  y: number;
  lastTime: number;
  time?: number;
  speed: number;
  lastSpeed: number;
  direct: number;
}

export interface ScrollData {
  target?: HTMLDivElement;
  event?: any;
  direct: number;
  targetY ?: number;
  scrollY?: number;
  scrollX?: number;
  scrollHeight?: number;
  scrollWidth?: number;
  height?: number;
  width?: number;
  bottomDistance ?: number;
}

const pullDownMaxDistance = 100;
const bottomLoadDistance = 60;

declare let window: any;

@Component({
  selector: 'app-sk-scroll',
  templateUrl: './sk-scroll.component.html',
  styleUrls: ['./sk-scroll.component.scss']
})

export class SkScrollComponent implements OnInit, AfterViewInit {
  @Input() direct: string; // x, y 默认y
  @Input() pullDownMaxDistance = pullDownMaxDistance;
  @Input() hasMore: boolean; // 用加载更多的数据
  @Input() hasRefresh: boolean; // 可以下拉刷新

  @Output() skPullDownRefresh: EventEmitter<SkScrollComponent> = new EventEmitter();
  @Output() skLoadMore: EventEmitter<SkScrollComponent> = new EventEmitter();

  @ViewChild('scroll') scroll: ElementRef;
  @ViewChild('scrollWrapper') scrollWrapper: ElementRef;

  touchData: TouchData = {
    x0: 0,
    y0: 0,
    xt: 0,
    yt: 0,
    dy: 0,
    dx: 0,
    y: 0,
    lastTime: 0,
    speed: 0,
    lastSpeed: 0,
    direct:0 // 0 -1 1
  };

  timer: Timer = new Timer(30, 30);

  private _isRunning: boolean = false;
  private _isEnd = true;
  private _durationNum = 4; // 4次结束
  private _frameTime = TimerManager.getDelay();
  private _minDistance = 10;


  constructor() {
    window.test = this;

    this.timer.stepEvent.subscribe(timer => {
      console.log(timer.getTime());
    });
    this.timer.run();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log(this.scroll.nativeElement);
  }

  // 设置y的坐标
  setTransformY(y) {
    this.scroll.nativeElement.style.transform = `translateY(${y}px)`;
  }

  setDuration(time) {
    this.scroll.nativeElement.style.transitionDuration = `${time}ms`;
  }

  endMove() {
    this._isEnd = true;
  }

  // 停止滚动
  stopMove() {
    this.touchData.direct = 0;
    this.touchData.y0 = this.touchData.yt = 0;
    this._isEnd = true;
    this.timer.stop();
    this.setTransformY(this.getCurrentY());
  }

  move(yt) {
    this._isEnd = false;
    this.setDuration('0ms');
    this.setTransformY(yt);

    this.endMove();
  }

  stopPropagation(e) {
    e.stopPropagation();
    if (e.cancelable && !e.defaultPrevented) {
      e.preventDefault();
    }
  }

  setStartMove(touch) {
    this.stopMove();
    let touchData = this.touchData;
    touchData.direct = 0;
    touchData.y0 = touch.clientY;
    touchData.lastTime = new Date().getTime();
  }

  /**
   *
   *  开始触摸的时候停止滚动
   *  暂时不考虑下拉刷新
   *
   */
  onTouchStartWrapper(e) {
    this.stopPropagation(e);
    this.setStartMove(e.touches[0]);
  }


  /**
   *
   * 滑动的时候
   *
   */
  onTouchMoveWrapper(e) {
    // if (!this._isEnd) {
    //   return;
    // }
    let touch = e.touches[0];
    let touchData = this.touchData;
    let dy, direct;

    let yt = touch.clientY;
    let time = new Date().getTime();

    dy = yt - touchData.y0;

    // 未改变y 更新时间
    let dTime = time - touchData.lastTime;
    let speed = 1000 * dy / dTime;  //1000 / 1000

    touchData.y0 = touchData.yt;
    touchData.yt = yt;
    touchData.y += parseInt(dy);

    if (!touchData.y0){
      touchData.y0 = yt;
      return;
    }
    console.log(touchData.yt, dy, touchData.y0);
    this.move(touchData.y);

    this._isEnd = false;
  }

 // 获取当前的y坐标
  getCurrentY() {
    let transform = getComputedStyle(this.scroll.nativeElement).transform.replace(")", "").split(',');
    return parseInt(transform[transform.length - 1]);
  }

  // 获取最大的滚动距离
  getMaxScroll() {
    let dy = this.scroll.nativeElement.offsetHeight - this.scrollWrapper.nativeElement.offsetHeight;
    return (dy > 0 ? dy : 0) + 160;
  }

  // touch结束
  onTouchEndWrapper() {
    this.stopMove();
  }

  resetTouchData() {
    this.touchData.dy = 0;
  }
}
