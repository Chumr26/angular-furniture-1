import { Component } from '@angular/core';
import { HighlightComponent } from './highlight/highlight.component';
import { BotwComponent } from './botw/botw.component';
import { BrowseByRoomComponent } from './browse-by-room/browse-by-room.component';

@Component({
  selector: '[home]',
  imports: [HighlightComponent, BotwComponent, BrowseByRoomComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
