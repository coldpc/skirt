import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkMsgComponent } from './sk-msg.component';

describe('SkMsgComponent', () => {
  let component: SkMsgComponent;
  let fixture: ComponentFixture<SkMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
