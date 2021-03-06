import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorStatTableComponent } from './vendor-stat-table.component';

describe('VendorStatTableComponent', () => {
  let component: VendorStatTableComponent;
  let fixture: ComponentFixture<VendorStatTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendorStatTableComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorStatTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
