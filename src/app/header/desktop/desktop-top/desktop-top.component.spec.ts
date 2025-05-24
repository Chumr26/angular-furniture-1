import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopTopComponent } from './desktop-top.component';

describe('DesktopTopComponent', () => {
  let component: DesktopTopComponent;
  let fixture: ComponentFixture<DesktopTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesktopTopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesktopTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
