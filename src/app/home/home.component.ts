import { Component, ViewEncapsulation } from '@angular/core';
import { HighlightComponent } from './highlight/highlight.component';
import { BotwComponent } from './botw/botw.component';
import { BrowseByRoomComponent } from './browse-by-room/browse-by-room.component';
import { TopSellingComponent } from './top-selling/top-selling.component';
import { SpecialOfferComponent } from './special-offer/special-offer.component';
import { PhilosophyComponent } from './philosophy/philosophy.component';
import { BrandComponent } from './brand/brand.component';
import { SubscribeComponent } from '../shared/subscribe/subscribe.component';

@Component({
  selector: '[home]',
  imports: [
    HighlightComponent,
    BotwComponent,
    BrowseByRoomComponent,
    TopSellingComponent,
    SpecialOfferComponent,
    PhilosophyComponent,
    BrandComponent,
    SubscribeComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {}
