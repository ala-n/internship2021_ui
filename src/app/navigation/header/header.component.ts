import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() sidebarVisibility!: boolean;
  @Output() sidebarVisibilityChange = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  openSidebar() {
    this.sidebarVisibilityChange.emit(true);
  }
}
