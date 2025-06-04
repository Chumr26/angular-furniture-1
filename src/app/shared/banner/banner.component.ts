import { Component, Input, ViewEncapsulation } from '@angular/core';
import { BreadcrumsComponent } from '../breadcrums/breadcrums.component';

@Component({
  selector: '[banner]',
  imports: [BreadcrumsComponent],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class BannerComponent {
  @Input() heroImg: string = '';
}
