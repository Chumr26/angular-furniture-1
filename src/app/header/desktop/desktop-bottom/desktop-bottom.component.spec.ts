import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopBottomComponent } from './desktop-bottom.component';

describe('DesktopBottomComponent', () => {
  let component: DesktopBottomComponent;
  let fixture: ComponentFixture<DesktopBottomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesktopBottomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesktopBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
