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
    // return products that match the given ids and the order of ids
    return ids
      .map((id) => this.products.find((product) => product.id === id))
      .filter((product) => product !== undefined) as Product[];
  }

  getProductsByCategory(category: string): Product[] {
    return this.products.filter((product) =>
      product.category
        .map((cat) => cat.toLowerCase())
        .includes(category.toLowerCase())
    );
  }

  getProductsByColor(color: string): Product[] {
    return this.products.filter((product) =>
      product.color.map((c) => c.toLowerCase()).includes(color.toLowerCase())
    );
  }
}
