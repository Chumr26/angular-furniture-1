import { Component, Input, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: '[breadcrums]',
  imports: [RouterLink],
  templateUrl: './breadcrums.component.html',
  styleUrl: './breadcrums.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class BreadcrumsComponent {
  @Input() breadcrumItems: string[] = []; // Receive breadcrums array as input
  
  convertUrl(segment: string): string {
    if(segment === 'Home') {
      return '/';
    }
    return segment.toLowerCase()
  }
}
