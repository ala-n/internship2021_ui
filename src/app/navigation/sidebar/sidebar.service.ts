import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  isSidebarVisible: BehaviorSubject<boolean>;

  constructor() {
    this.isSidebarVisible = new BehaviorSubject<boolean>(false);
  }

  getSidebarVisibility(): Observable<boolean> {
    return this.isSidebarVisible.asObservable();
  }

  setSidebarVisibility(value: boolean): void {
    this.isSidebarVisible.next(value);
  }
}
