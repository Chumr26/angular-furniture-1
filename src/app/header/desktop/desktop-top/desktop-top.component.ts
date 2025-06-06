import { Component, ViewEncapsulation } from '@angular/core';

export interface Svg {
  name: string;
  label: string;
}

@Component({
  selector: '[desktop-top]',
  imports: [],
  templateUrl: './desktop-top.component.html',
  styleUrl: './desktop-top.component.css',
  encapsulation: ViewEncapsulation.None, // Disable encapsulation
})
export class DesktopTopComponent {
  networks: Svg[] = [
    { name: 'facebook', label: 'Facebook' },
    { name: 'twitter', label: 'X (Twitter)' },
    { name: 'instagram', label: 'Instagram' },
    { name: 'youtube', label: 'YouTube' },
    { name: 'whatsapp', label: 'WhatsApp' },
  ];
}
