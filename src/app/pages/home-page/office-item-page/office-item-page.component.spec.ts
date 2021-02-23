import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeItemPageComponent } from './office-item-page.component';

describe('OfficeItemPageComponent', () => {
  let component: OfficeItemPageComponent;
  let fixture: ComponentFixture<OfficeItemPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfficeItemPageComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeItemPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
