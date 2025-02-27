import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private showSignupSubject = new BehaviorSubject<boolean>(false);
  showSignup$ = this.showSignupSubject.asObservable();

  openSignup() {
    this.showSignupSubject.next(true);
  }

  closeSignup() {
    this.showSignupSubject.next(false);
  }
}
