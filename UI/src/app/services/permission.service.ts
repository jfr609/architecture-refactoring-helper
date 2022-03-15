import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  isAdminSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  get isAdmin(): boolean {
    return this.isAdminSubject.value;
  }

  set isAdmin(value: boolean) {
    this.isAdminSubject.next(value);
  }

  constructor() {}
}
