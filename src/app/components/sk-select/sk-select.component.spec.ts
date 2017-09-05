import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkSelectComponent } from './sk-select.component';

describe('SkSelectComponent', () => {
  let component: SkSelectComponent;
  let fixture: ComponentFixture<SkSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
