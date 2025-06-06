import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelflareComponent } from './welflare.component';

describe('WelflareComponent', () => {
  let component: WelflareComponent;
  let fixture: ComponentFixture<WelflareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelflareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelflareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
