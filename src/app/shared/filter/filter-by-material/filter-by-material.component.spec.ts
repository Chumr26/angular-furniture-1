import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterByMaterialComponent } from './filter-by-material.component';

describe('FilterByMaterialComponent', () => {
  let component: FilterByMaterialComponent;
  let fixture: ComponentFixture<FilterByMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterByMaterialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterByMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
