import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkBtnComponent } from './sk-btn.component';

describe('SkBtnComponent', () => {
  let component: SkBtnComponent;
  let fixture: ComponentFixture<SkBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
