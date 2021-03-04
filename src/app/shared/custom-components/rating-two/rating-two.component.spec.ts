import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingTwoComponent } from './rating-two.component';

describe('RatingTwoComponent', () => {
  let component: RatingTwoComponent;
  let fixture: ComponentFixture<RatingTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RatingTwoComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
