import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: '[brand]',
  imports: [],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class BrandComponent {
  brands = [
    'asgardia',
    'boltshift',
    'contrast',
    'goldline',
    'komplex',
    'magnolia',
  ];
}
