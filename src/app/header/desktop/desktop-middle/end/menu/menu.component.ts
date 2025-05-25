import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

interface MenuItem {
  label: string;
  route: string;
  subMenu?: MenuItem[];
}

@Component({
  selector: '[menu]',
  imports: [RouterLink, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  // Define the menu items with their labels and routes
  menuItems: MenuItem[] = [
    { label: 'Home', route: '/' },
    {
      label: 'Shop',
      route: '/shop',
      subMenu: [
        { label: 'Variable Product', route: '#' },
        { label: 'Product Gallery', route: '#' },
        { label: 'Advanced Reviews', route: '#' },
        { label: 'Custom Tab', route: '#' },
        { label: 'Related Products - Slider', route: '#' },
      ],
    },
    { label: 'About Us', route: '/about-us' },
    { label: 'News', route: '/news' },
    { label: 'Contact Us', route: '/contact-us' },
  ];

  hoveredIndex: number = -1;

  constructor(private router: Router) {}

  currentRoute(): string {
    // Get the current route from the router
    return this.router.url; // Remove the leading slash
  }

  onHover(index: number): void {
    this.hoveredIndex = index;
  }
}
