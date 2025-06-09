import { Component, Input, ViewEncapsulation } from '@angular/core';
import { BreadcrumsComponent } from '../breadcrums/breadcrums.component';
import { Router } from '@angular/router';

@Component({
  selector: '[banner]',
  imports: [BreadcrumsComponent],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class BannerComponent {
  @Input() heroImg: string = '';
  breadcrumItems: string[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.breadcrumItems = this.router.url
      .split('page')[0] // Remove query parameters
      .split('/')
      .filter((segment) => segment !== '');

    this.breadcrumItems.unshift('Home'); // Add 'Home' at the beginning
  }
}
