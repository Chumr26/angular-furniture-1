import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Svg } from '../header/desktop/desktop-top/desktop-top.component';

interface FooterLink {
  label: string;
  items: Array<{
    label: string;
    url: string;
  }>;
}

@Component({
  selector: '[footer]',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class FooterComponent {
  footerLinks: FooterLink[] = [
    {
      label: 'Shop Categories',
      items: [
        {
          label: 'Armchairs',
          url: '/product-category/armchairs',
        },
        {
          label: 'Beds',
          url: '/product-category/beds',
        },
        {
          label: 'Chairs',
          url: '/product-category/chairs',
        },
        {
          label: 'Decor',
          url: '/product-category/decor',
        },
        {
          label: 'Sofas',
          url: '/product-category/sofas',
        },
        {
          label: 'Storage',
          url: '/product-category/storage',
        },
        {
          label: 'Tables',
          url: '/product-category/tables',
        },
      ],
    },
    {
      label: 'Useful Links',
      items: [
        {
          label: 'Careers',
          url: '#',
        },
        {
          label: 'Delivery',
          url: '#',
        },
        {
          label: 'Help Center',
          url: '#',
        },
        {
          label: 'Returns & Refunds',
          url: '#',
        },
        {
          label: 'Newsletter',
          url: '#',
        },
        { label: 'Status', url: '#' },
        {
          label: 'Testimonials',
          url: '#',
        },
      ],
    },
    {
      label: 'Account',
      items: [
        {
          label: 'User Dashboard',
          url: '#',
        },
        {
          label: 'Wishlist',
          url: '#',
        },
        {
          label: 'Shipping & Delivery',
          url: 'https://startersites.io/blocksy/cosmetic#',
        },
        {
          label: 'Affiliate Program',
          url: '#',
        },
        {
          label: 'Brand Assets',
          url: '#',
        },
        {
          label: 'Support',
          url: '#',
        },
        {
          label: 'Recommendations',
          url: '#',
        },
      ],
    },
    {
      label: 'About Company',
      items: [
        {
          label: 'About Us',
          url: '#',
        },
        {
          label: 'Our Partners',
          url: '#',
        },
        {
          label: 'Locations',
          url: '#',
        },
        {
          label: 'Design Services',
          url: '#',
        },
        {
          label: 'How it Works',
          url: '#',
        },
        {
          label: 'Customers',
          url: '#',
        },
        {
          label: 'Other Info',
          url: '#',
        },
      ],
    },
  ];

  socials: Svg[] = [
    {
      name: 'facebook',
      label: 'Facebook',
    },
    {
      name: 'twitter',
      label: 'X (Twitter)',
    },
    {
      name: 'instagram',
      label: 'Instagram',
    },
    {
      name: 'linkedin',
      label: 'LinkedIn',
    },
    {
      name: 'medium',
      label: 'Medium',
    },
  ];

  menuItems: Array<{ label: string; url: string }> = [
    { label: 'Privacy Policy', url: '#' },
    { label: 'Terms & Conditions', url: '#' },
    { label: 'Site Map', url: '#' },
  ];
}
