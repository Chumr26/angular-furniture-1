import { Component, ViewEncapsulation } from '@angular/core';

interface CategoryMenuItem {
  label: string;
  icon: string;
  link: string;
}
@Component({
  selector: '[desktop-bottom]',
  imports: [],
  templateUrl: './desktop-bottom.component.html',
  styleUrl: './desktop-bottom.component.css',
  encapsulation: ViewEncapsulation.None, // Disable encapsulation
})
export class DesktopBottomComponent {
  categories: CategoryMenuItem[] = [
    { label: 'Chairs', icon: 'chair-icon', link: 'chairs' },
    { label: 'Storage', icon: 'storage-icon', link: 'storage' },
    { label: 'Armchairs', icon: 'armchair-icon', link: 'armchairs' },
    { label: 'Sofas', icon: 'sofa-icon', link: 'sofas' },
    { label: 'Beds', icon: 'bed-icon', link: 'beds' },
    { label: 'Tables', icon: 'table-icon', link: 'tables' },
    { label: 'Decor', icon: 'decor-icon', link: 'decor' },
  ];
}
