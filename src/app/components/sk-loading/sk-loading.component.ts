import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sk-loading',
  templateUrl: './sk-loading.component.html',
  styleUrls: ['./sk-loading.component.scss']
})
export class SkLoadingComponent {
  @Input() info: string;
  constructor() { }
}
