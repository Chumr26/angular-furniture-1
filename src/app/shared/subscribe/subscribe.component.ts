import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: '[subscribe]',
  imports: [],
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class SubscribeComponent {
  isSubmitted = false;
  onSubmit(event: Event) {
    event.preventDefault(); // Prevent the default form submission behavior
    this.isSubmitted = true;
  }
}
