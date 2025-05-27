import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: '[highlight]',
  imports: [RouterLink],
  templateUrl: './highlight.component.html',
  styleUrl: './highlight.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class HighlightComponent {}
