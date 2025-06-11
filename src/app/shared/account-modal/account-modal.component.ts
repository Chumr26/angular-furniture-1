import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';

@Component({
  selector: '[account-modal]',
  imports: [],
  templateUrl: './account-modal.component.html',
  styleUrl: './account-modal.component.css',
})
export class AccountModalComponent {
  constructor(private accountService: AccountService) {}

  toggleAccountModal() {
    this.accountService.toggleIsActive();
  }
}
