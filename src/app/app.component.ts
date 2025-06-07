import { Component, Renderer2, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CartComponent } from './header/cart/cart.component';
import { CartService } from './services/cart.service';

@Component({
  selector: '[main-container]',
  imports: [HeaderComponent, FooterComponent, RouterOutlet, CartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  isCartActive = false;
  title = 'angular-furniture';

  constructor(private cartService: CartService, private renderer: Renderer2) {}
  ngOnInit() {
    // Subscribe to the cart service to get the active state of the cart
    this.cartService.getIsActive().subscribe((isActive) => {
      this.isCartActive = isActive;
      // Add or remove the 'cart-active' class on the <body> element
      if (isActive) {
        this.renderer.addClass(document.body, 'cart-active');
      } else {
        this.renderer.removeClass(document.body, 'cart-active');
      }
    });
  }

  closeCart() {
    this.cartService.toggleIsActive();
  }
}
