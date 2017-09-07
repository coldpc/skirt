import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkLoadingComponent } from './sk-loading.component';

describe('SkLoadingComponent', () => {
  let component: SkLoadingComponent;
  let fixture: ComponentFixture<SkLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
