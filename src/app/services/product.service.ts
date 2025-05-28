import { Injectable } from '@angular/core';
import productsData from './products.json';
import { Product } from '../models/app.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: Product[] = [];

  constructor() {
    this.products = productsData;
  }

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: string): Product | undefined {
    return this.products.find((product) => product.id === id);
  }

  getProductsByIds(ids: string[]): Product[] {
    return this.products.filter((product) => ids.includes(product.id));
  }
}
