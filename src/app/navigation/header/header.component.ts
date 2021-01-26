import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() sidebarVisibility!: boolean;
  @Output() sidebarVisibilityChange = new EventEmitter<boolean>();

  openSidebar() {
    this.sidebarVisibilityChange.emit(true);
  }
}
