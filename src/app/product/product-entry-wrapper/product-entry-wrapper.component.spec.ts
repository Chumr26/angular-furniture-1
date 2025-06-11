import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEntryWrapperComponent } from './product-entry-wrapper.component';

describe('ProductEntryWrapperComponent', () => {
  let component: ProductEntryWrapperComponent;
  let fixture: ComponentFixture<ProductEntryWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductEntryWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductEntryWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
