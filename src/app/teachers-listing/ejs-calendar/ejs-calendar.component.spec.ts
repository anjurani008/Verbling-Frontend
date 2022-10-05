import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EjsCalendarComponent } from './ejs-calendar.component';

describe('EjsCalendarComponent', () => {
  let component: EjsCalendarComponent;
  let fixture: ComponentFixture<EjsCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EjsCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EjsCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
