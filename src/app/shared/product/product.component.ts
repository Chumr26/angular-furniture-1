import { Component, Input } from '@angular/core';
import { Product } from '../../models/app.model';
import { CartButtonsComponent } from './cart-buttons/cart-buttons.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: '[product]',
  imports: [RouterLink, CommonModule, CartButtonsComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  @Input({ required: true }) productData!: Product;
  slug: string = '';
  ngOnInit() {
    this.slug = this.productData.name.toLowerCase().replace(/ /g, '-');
  }
}
