import { Component } from '@angular/core';
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
})
export class HeaderComponent {}
