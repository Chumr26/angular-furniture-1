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

  toggleCart($event: Event) {
    $event.preventDefault();
    if (this.cartItemCount === 0) {
      this.cartService.setShowEmptyCartAlert(true);
      setTimeout(() => this.cartService.setShowEmptyCartAlert(false), 3000); // Hide alert after 3 seconds
    } else {
      this.cartService.toggleIsActive();
    }
  }
}
