import { Component, HostListener, Renderer2, ElementRef, ViewEncapsulation } from '@angular/core';
import { DesktopTopComponent } from './desktop/desktop-top/desktop-top.component';
import { DesktopMiddleComponent } from './desktop/desktop-middle/desktop-middle.component';
import { DesktopBottomComponent } from './desktop/desktop-bottom/desktop-bottom.component';

@Component({
  selector: '[header]',
  imports: [
    DesktopTopComponent,
    DesktopMiddleComponent,
    DesktopBottomComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const stickyElement = this.el.nativeElement.querySelector('[data-sticky]');
    if (window.scrollY > 0) {
      this.renderer.setAttribute(stickyElement, 'data-sticky', 'yes:shrink');
    } else {
      this.renderer.setAttribute(stickyElement, 'data-sticky', 'fixed:shrink');
    }
  }
}