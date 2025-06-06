import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterByBrandComponent } from './filter-by-brand.component';

describe('FilterByBrandComponent', () => {
  let component: FilterByBrandComponent;
  let fixture: ComponentFixture<FilterByBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterByBrandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterByBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
