import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookRescheduleModalComponent } from './book-reschedule-modal.component';

describe('BookRescheduleModalComponent', () => {
  let component: BookRescheduleModalComponent;
  let fixture: ComponentFixture<BookRescheduleModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookRescheduleModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookRescheduleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
