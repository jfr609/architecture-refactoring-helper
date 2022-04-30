import { Injectable } from '@angular/core';
import { BehaviorSubject, Observer, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private _isAdminSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);

  get isAdmin(): boolean {
    return this._isAdminSubject.value;
  }

  set isAdmin(value: boolean) {
    this._isAdminSubject.next(value);
  }

  subscribeToIsAdmin(
    observer: Partial<Observer<boolean>> | undefined
  ): Subscription {
    return this._isAdminSubject.subscribe(observer);
  }
}
