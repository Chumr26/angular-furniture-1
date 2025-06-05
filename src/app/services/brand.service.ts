import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private brands = [
    'asgardia',
    'boltshift',
    'contrast',
    'goldline',
    'komplex',
    'magnolia',
  ];

  getBrands(): string[] {
    return this.brands;
  }
}
