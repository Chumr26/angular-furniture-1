import { Component, ViewEncapsulation } from '@angular/core';
import { StartComponent } from './start/start.component';
import { EndComponent } from './end/end.component';

@Component({
  selector: '[desktop-middle]',
  imports: [StartComponent, EndComponent],
  templateUrl: './desktop-middle.component.html',
  styleUrl: './desktop-middle.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class DesktopMiddleComponent {}
