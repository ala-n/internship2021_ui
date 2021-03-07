import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsStatTableComponent } from './tags-stat-table.component';

describe('TagsStatTableComponent', () => {
  let component: TagsStatTableComponent;
  let fixture: ComponentFixture<TagsStatTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TagsStatTableComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsStatTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
