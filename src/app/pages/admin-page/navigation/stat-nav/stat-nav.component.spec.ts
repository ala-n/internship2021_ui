import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatNavComponent } from './stat-nav.component';

describe('StatNavComponent', () => {
  let component: StatNavComponent;
  let fixture: ComponentFixture<StatNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatNavComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
