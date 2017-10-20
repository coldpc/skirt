import {Component, OnInit, Input, Output, EventEmitter, AfterViewInit} from '@angular/core';

declare const IScroll: any;

@Component({
    selector: 'app-sk-scroll',
    templateUrl: './sk-scroll.component.html',
    styleUrls: ['./sk-scroll.component.scss']
})
export class SkScrollComponent implements OnInit, AfterViewInit {
    @Output() skPullDownRefresh: EventEmitter<SkScrollComponent> = new EventEmitter();
    @Output() skLoadMore: EventEmitter<SkScrollComponent> = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        debugger;
    }
}
