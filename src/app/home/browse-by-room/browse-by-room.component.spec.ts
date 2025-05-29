import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseByRoomComponent } from './browse-by-room.component';

describe('BrowseByRoomComponent', () => {
  let component: BrowseByRoomComponent;
  let fixture: ComponentFixture<BrowseByRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowseByRoomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowseByRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
