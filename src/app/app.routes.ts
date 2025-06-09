import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { NewsComponent } from './news/news.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductComponent } from './product/product.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home Page' },
  { path: 'shop', component: ShopComponent, title: 'Shop Page' },
  { path: 'shop/page/:page', component: ShopComponent, title: 'Shop Page' },
  {
    path: 'product/:product',
    component: ProductComponent,
    title: 'Product Page',
  },
  { path: 'about-us', component: AboutUsComponent, title: 'About Us Page' },
  { path: 'news', component: NewsComponent, title: 'News Page' },
  {
    path: 'contact-us',
    component: ContactUsComponent,
    title: 'Contact Us Page',
  },
  {
    path: 'cart',
    component: CartComponent,
    title: 'Cart Page',
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    title: 'Checkout Page',
  },
];
