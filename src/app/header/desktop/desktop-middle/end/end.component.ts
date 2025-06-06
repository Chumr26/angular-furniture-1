import { Component, OnInit } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { CartService } from '../../../../services/cart.service';

@Component({
  selector: '[end]',
  imports: [MenuComponent],
  templateUrl: './end.component.html',
  styleUrl: './end.component.css',
})
export class EndComponent implements OnInit {
  cartItemCount: number = 0;
  bounce: boolean = false;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    // Subscribe to cart items and update the badge count
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItemCount = items.length;
      this.bounce = true;
      setTimeout(() => (this.bounce = false), 500);
    });
  }
}
