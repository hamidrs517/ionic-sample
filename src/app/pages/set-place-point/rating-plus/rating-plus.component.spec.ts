import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingPlusComponent } from './rating-plus.component';

describe('RatingPlusComponent', () => {
  let component: RatingPlusComponent;
  let fixture: ComponentFixture<RatingPlusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingPlusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingPlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
