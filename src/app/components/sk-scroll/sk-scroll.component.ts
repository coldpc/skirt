import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
  bottomDistance ?: number;
}

const pullDownMaxDistance = 100;
const bottomLoadDistance = 60;

@Component({
  selector: 'app-sk-scroll',
  templateUrl: './sk-scroll.component.html',
  styleUrls: ['./sk-scroll.component.scss']
})
export class SkScrollComponent implements OnInit {
  @Input() direct: string; // x, y 默认y
  @Input() pullDownMaxDistance = pullDownMaxDistance;
  @Input() hasMore: boolean; // 用加载更多的数据
  @Input() hasRefresh: boolean; // 可以下拉刷新

  @Output() skPullDownRefresh: EventEmitter<SkScrollComponent> = new EventEmitter();
  @Output() skLoadMore: EventEmitter<SkScrollComponent> = new EventEmitter();

  scrollData: ScrollData = {
    scrollY: 0,
    bottomDistance: NaN
  }; // 滚动跳的数据
  isLoadingMore = false;

  pullDownDistance = 0; //下拉距离
  isDownRefreshing = false;

  touchData: TouchData = {
    x0: 0,
    y0: 0,
    xt: 0,
    yt: 0,
    dy: 0,
    dx: 0
  };
  constructor() {
  }

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
    scrollData.bottomDistance = scrollData.scrollHeight - scrollData.scrollY - scrollData.height;

    if(this.hasMore
      && !this.isLoadingMore && !isNaN(scrollData.bottomDistance) && scrollData.bottomDistance < bottomLoadDistance) {
      this.skLoadMore.emit(this);
      this.isLoadingMore = true;
    }
  }

  stopPropagation(e) {
    e.stopPropagation();
    if (e.cancelable && !e.defaultPrevented) {
      e.preventDefault();
    }
  }

  /**
   *
   * @param e
   * 下拉的时候导致刷新
   *
   */
  onTouchStartWrapper(e) {
    const touch = e.touches[0];
    const touchData = this.touchData;
    touchData.y0 = touch.clientY;

    if (this.isDownRefreshing) {
      this.stopPropagation(e);
    }
  }

  onTouchMoveWrapper(e) {
    let touch = e.touches[0];
    let touchData = this.touchData;
    let scrollData = this.scrollData;

    touchData.yt = touch.clientY;
    touchData.dy = touchData.yt - touchData.y0;
    touchData.y0 = touchData.yt;

    if (touchData.dy > 0 &&scrollData.scrollY < 3) {
      this.stopPropagation(e);
      this.countPullDownDistance(touchData.dy);
    }
  }

  // 计算下拉的距离
  countPullDownDistance(dy) {
    let distance  = 0.1 + 26 * dy * Math.sign(pullDownMaxDistance - this.pullDownDistance ) / pullDownMaxDistance;
    this.pullDownDistance += distance;
  }

  // touch结束
  onTouchEndWrapper() {
    let distance = this.pullDownDistance;
    if (distance > 0) {
      if (distance < 0.5 * this.pullDownMaxDistance) {
        this.pullDownDistance = 0;
      } else {
        this.isDownRefreshing = true;
        this.pullDownDistance = this.pullDownMaxDistance;
        this.skPullDownRefresh.emit(this);
      }
    }

    this.resetTouchData();
  }

  resetTouchData() {
    this.touchData.dy = 0;
  }

  // 结束刷新
  endPullDown(): void {
    this.isDownRefreshing = false;
    this.pullDownDistance = 0;
  }

  endLoadingMore(hasMore) {
    console.log("end-has-more", hasMore);
    this.hasMore = hasMore;
    this.isLoadingMore = false;
  }
}
