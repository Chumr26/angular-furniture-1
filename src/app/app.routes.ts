import { Routes } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { ShopComponent } from './main/shop/shop.component';
import { NewsComponent } from './main/news/news.component';
import { AboutUsComponent } from './main/about-us/about-us.component';
import { ContactUsComponent } from './main/contact-us/contact-us.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home Page' },
  { path: 'shop', component: ShopComponent, title: 'Shop Page' },
  { path: 'about-us', component: AboutUsComponent, title: 'About Us Page' },
  { path: 'news', component: NewsComponent, title: 'News Page' },
  {
    path: 'contact-us',
    component: ContactUsComponent,
    title: 'Contact Us Page',
  },
];
