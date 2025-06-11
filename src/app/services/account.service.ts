import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private isActiveSubject = new BehaviorSubject<boolean>(false);

  constructor() {}

  toggleIsActive(): void {
    const currentState = this.isActiveSubject.value;
    this.isActiveSubject.next(!currentState);
  }

  getIsActive(): Observable<boolean> {
    return this.isActiveSubject.asObservable();
  }
}