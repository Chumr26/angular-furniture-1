import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { NewsComponent } from './news/news.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UsersComponent } from './admin-dashboard/users/users.component';
import { OrdersComponent } from './admin-dashboard/orders/orders.component';
import { ProductsComponent } from './admin-dashboard/products/products.component';
import { ProductDetailComponent } from './product/product-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home Page' },
  { path: 'shop', component: ShopComponent, title: 'Shop Page' },
  { path: 'shop/page/:page', component: ShopComponent, title: 'Shop Page' },
  {
    path: 'product/:product',
    component: ProductDetailComponent,
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
  {
    path: 'dashboard',
    component: AdminDashboardComponent,
    title: 'Admin Dashboard',
    children: [
      { path: 'users', component: UsersComponent, title: 'Users Page' },
      { path: 'orders', component: OrdersComponent, title: 'Orders Page' },
      { path: 'products', component: ProductsComponent, title: 'Products Page' },
    ],
  },
];
