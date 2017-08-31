import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkMaskComponent } from './sk-mask.component';

describe('SkMaskComponent', () => {
  let component: SkMaskComponent;
  let fixture: ComponentFixture<SkMaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkMaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkMaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
