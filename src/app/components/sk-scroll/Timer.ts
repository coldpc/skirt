import {TimerManager} from "./TimerManager";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

export class Timer {
  private _delay: number;
  private _repeatCount: number;
  private _currentCount: number;
  private _id: number;
  private _time: number;
  private _isRunning = false;
  private _isAuto: boolean = false;

  public stepEvent: BehaviorSubject<Timer>;
  public completeEvent: BehaviorSubject<Timer>;

  private static _timerManager: TimerManager = new TimerManager();


  /**
   *
   * @param delay 执行间隔 单位ms
   * @param repeatCount 重复次数
   * @param auto 自动释放
   *
   */
  constructor(delay, repeatCount, isAuto = false) {
    this._delay = delay;
    this._repeatCount = repeatCount;
    this._currentCount = 0;

    this._time = 0;
    this._isRunning = false;
    this._isAuto = isAuto;

    this.stepEvent = new BehaviorSubject(this);
    this.completeEvent = new BehaviorSubject(this);
  }

  isRunning(): boolean {
    return this._isRunning;
  }

  addTime(delay) {
    this._time += delay;
  }

  getTime(): number {
    return this._time;
  }

  getDelay(): number {
    return this._delay;
  }

  doStep() {
    this._currentCount ++;
    this._time  -= this.getDelay();
    this.stepEvent.next(this);

    if (this._repeatCount !== 0 && this._currentCount >= this._repeatCount) {
      this.complete();
    }
  }

  complete() {
    this.completeEvent.next(this);
    this.stop();
    if (this._isAuto) {
      this.dispose();
    }
  }


  reset(delay, repeatCount) {
    this._delay = delay;
    this._repeatCount = repeatCount;
    this._time = 0;
    this._currentCount = 0;
    this._isRunning = false;
  }

  stop() {
    this._isRunning = false;
    this._time = 0;
  }

  run(){
    this._isRunning = true;
    Timer._timerManager.startTask(this);
  }

  dispose() {
    this._isRunning = false;
    Timer._timerManager.dispose(this._id);
  }
}
