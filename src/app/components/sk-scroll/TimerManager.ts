/*
 *计时器管理
 * 执行间隔 重复次数 0为永远执行
 * var timer = new moto.Timer(delay, repeatCount);
 *
 * 执行一次调用一次
 * timer.addEventListener(moto.TimerEvent.TIMER, func, arguments);
 *
 * 完成时调用
 * timer.addEventListener(moto.TimerEvent.TIMER_COMPLETE, func, arguments);
 */
import {Timer} from "./Timer";

const StateRun = 'run';
const StateStop = 'stop';

declare let window: any;

export class TimerManager {

  //重新获取计时器 屏幕刷新计时方法
  private static _setTimeout = (function () {
    let w = window;
    return w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.mozRequestAnimationFrame;
  })();

  private static _countDelay(timeArray: Array<number>): number {
    timeArray = timeArray.slice(20, 80);
    let sum = 0;
    for (let time of timeArray) {
      sum += time;
    }
    return sum / timeArray.length;
  }

  static countFrameRateTime() {

    let count = 0;
    let start = null;
    let lastTimestamp = null;
    let delta = 0;
    let timeArray: Array<number> = [];

    function req(timestamp) {
      if (start === null) {
        start = timestamp;
        lastTimestamp = timestamp;
      }

      count++;
      delta = timestamp - lastTimestamp;

      // 放进数组
      timeArray.push(delta);


      lastTimestamp = timestamp;
      if (count < 100) {
        TimerManager._setTimeout(req);
      } else {
        TimerManager._delay = TimerManager._countDelay(timeArray);
        count = start = lastTimestamp = delta = timeArray = null;
        console.log(TimerManager._delay, timeArray);
      }
    }

    TimerManager._setTimeout(req)
  }

  public static getDelay(): number {
    return TimerManager._delay;
  }

  private static _delay = 16;
  private _tasks = {};
  private _sequence = 0;
  private _state = StateStop; // run
  private _timer = 0;

  constructor() {
    TimerManager.countFrameRateTime();
  }

  private _doTask() {
    let tasks = this._tasks;
    let task: Timer;
    let hasTask = false;

    for (let key in tasks) {
      task = tasks[key];

      if (task.isRunning()) {

        hasTask = true;
        task.addTime(TimerManager._delay);

        //时间间隔大于等于
        if (task.getTime() >= task.getDelay()) {
          task.doStep();
        }
      }
    }

    if (!hasTask) {
      this._stop();
    } else {
      this._run();
    }
  }

  //开始任务
  startTask(task) {
    let id = task.id = this.getTaskId();
    this._tasks[id] = task;

    if (this._state == StateStop) {
      this._restartRun();
    }
  };

  private _restartRun() {
    this._state = StateRun;
    this._run();
  }

  private _run() {
    this._timer = TimerManager._setTimeout(() => {
      this._doTask();
    });
  }

  private _stop() {
    console.log('stop');
    this._state = StateStop;
  }

  //获取任务id
  getTaskId() {
    return ++this._sequence;
  };

  //移除某个id
  dispose(task) {
    delete this._tasks[task.id];
  }
}
