import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: '[account-modal]',
  imports: [FormsModule],
  templateUrl: './account-modal.component.html',
  styleUrl: './account-modal.component.css',
})
export class AccountModalComponent {
  showPassword: boolean = false;
  email: string = '';
  password: string = '';
  conirmPassword: string = '';
  error: boolean = false; // Placeholder for error handling
  isSignup: boolean = false; // Placeholder for signup state

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.accountService.getisSignUp().subscribe((isSignUp) => {
      this.isSignup = isSignUp;
    });
  }

  toggleSignUp() {
    this.isSignup = !this.isSignup;
  }

  toggleAccountModal() {
    this.accountService.toggleIsActive();
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  login() {
    // console.log(this.email, this.password);
    const success = this.accountService.login(this.email, this.password);
    this.error = !success;
  }

  signup() {
    if (this.password !== this.conirmPassword) {
      this.error = true;
      return;
    }
    const success = this.accountService.signup(this.email, this.password);
    if (success) {
      this.toggleAccountModal();
    }
  }
}
