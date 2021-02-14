import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeTableComponent } from './office-table.component';

describe('OfficeTableComponent', () => {
  let component: OfficeTableComponent;
  let fixture: ComponentFixture<OfficeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfficeTableComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
