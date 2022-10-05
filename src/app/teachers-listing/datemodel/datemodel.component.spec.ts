import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatemodelComponent } from './datemodel.component';

describe('CheckoutComponent', () => {
  let component: DatemodelComponent;
  let fixture: ComponentFixture<DatemodelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatemodelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatemodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
