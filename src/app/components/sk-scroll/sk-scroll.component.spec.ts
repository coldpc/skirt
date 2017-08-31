import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkScrollComponent } from './sk-scroll.component';

describe('SkScrollComponent', () => {
  let component: SkScrollComponent;
  let fixture: ComponentFixture<SkScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
