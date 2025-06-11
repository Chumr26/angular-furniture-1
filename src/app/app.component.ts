import { Component, Renderer2, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CartComponent } from './header/cart/cart.component';
import { CartService } from './services/cart.service';
import { AccountModalComponent } from './shared/account-modal/account-modal.component';
import { AccountService } from './services/account.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: '[main-container]',
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    RouterOutlet,
    CartComponent,
    AccountModalComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  isCartActive = false;
  currentUrl = '';
  title = 'angular-furniture';
  isAccountActive = false;

  constructor(
    private cartService: CartService,
    private renderer: Renderer2,
    private accountService: AccountService
  ) {}
  ngOnInit() {
    // Subscribe to the cart service to get the active state of the cart
    this.cartService.getIsActive().subscribe((isActive) => {
      this.isCartActive = isActive;
      // Add or remove the 'cart-active' class on the <body> element
      if (isActive) {
        this.renderer.addClass(document.body, 'modal-active');
      } else {
        this.renderer.removeClass(document.body, 'modal-active');
      }
      this.currentUrl = window.location.href;
    });

    this.accountService.getIsActive().subscribe((isActive) => {
      this.isAccountActive = isActive;
      // Add or remove the 'account-active' class on the <body> element
      if (isActive) {
        this.renderer.addClass(document.body, 'modal-active');
      } else {
        this.renderer.removeClass(document.body, 'modal-active');
      }
    });
  }

  closeCart() {
    this.cartService.toggleIsActive();
  }

  closeAccount() {
    this.accountService.toggleIsActive();
  }
}
