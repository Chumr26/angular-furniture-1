import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: '[breadcrums]',
  templateUrl: './breadcrums.component.html',
  styleUrl: './breadcrums.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class BreadcrumsComponent implements OnInit {
  breadcrums: string[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.breadcrums = this.router.url
      .split('?')[0] // Remove query parameters
      .split('/')
      .filter((segment) => segment !== '');
  }
}
