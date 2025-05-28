import { Component } from '@angular/core';
import { HighlightComponent } from './highlight/highlight.component';
import { BotwComponent } from './botw/botw.component';

@Component({
  selector: '[home]',
  imports: [HighlightComponent, BotwComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
