import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopMiddleComponent } from './desktop-middle.component';

describe('DesktopMiddleComponent', () => {
  let component: DesktopMiddleComponent;
  let fixture: ComponentFixture<DesktopMiddleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesktopMiddleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesktopMiddleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
