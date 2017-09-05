import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkDatePickerComponent } from './sk-date-picker.component';

describe('SkDatePickerComponent', () => {
  let component: SkDatePickerComponent;
  let fixture: ComponentFixture<SkDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkDatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
