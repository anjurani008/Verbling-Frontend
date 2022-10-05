import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotmodalComponent } from './slotmodal.component';

describe('SlotmodalComponent', () => {
  let component: SlotmodalComponent;
  let fixture: ComponentFixture<SlotmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlotmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
