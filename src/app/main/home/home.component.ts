import { Component } from '@angular/core';
import { HighlightComponent } from './highlight/highlight.component';

@Component({
  selector: '[home]',
  imports: [HighlightComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
