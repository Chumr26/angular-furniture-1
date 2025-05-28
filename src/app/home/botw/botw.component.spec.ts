import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotwComponent } from './botw.component';

describe('BotwComponent', () => {
  let component: BotwComponent;
  let fixture: ComponentFixture<BotwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotwComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
