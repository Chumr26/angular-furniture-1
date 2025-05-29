import { Component } from '@angular/core';
import { HighlightComponent } from './highlight/highlight.component';
import { BotwComponent } from './botw/botw.component';
import { BrowseByRoomComponent } from './browse-by-room/browse-by-room.component';
import { TopSellingComponent } from './top-selling/top-selling.component';
import { SpecialOfferComponent } from './special-offer/special-offer.component';

@Component({
  selector: '[home]',
  imports: [
    HighlightComponent,
    BotwComponent,
    BrowseByRoomComponent,
    TopSellingComponent,
    SpecialOfferComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
