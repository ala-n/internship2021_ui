import { EventManager } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResizeService {
  private resizeSubject!: Subject<Window>;

  get onResize$(): Observable<Window> {
    return this.resizeSubject.asObservable();
  }

  constructor(private eventService: EventManager) {
    this.resizeSubject = new Subject();
    this.eventService.addGlobalEventListener(
      'window',
      'resize',
      this.onResize.bind(this)
    );
  }

  private onResize(event: UIEvent) {
    this.resizeSubject.next(<Window>event.target);
  }
}
