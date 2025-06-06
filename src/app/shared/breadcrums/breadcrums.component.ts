import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: '[breadcrums]',
  templateUrl: './breadcrums.component.html',
  styleUrl: './breadcrums.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class BreadcrumsComponent implements OnInit {
  breadcrums: string[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.breadcrums = this.router.url
      .split('/')
      .filter((segment) => segment !== '');
  }
}
