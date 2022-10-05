import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReschedComponent } from './resched.component';

describe('ReschedComponent', () => {
  let component: ReschedComponent;
  let fixture: ComponentFixture<ReschedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReschedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReschedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
