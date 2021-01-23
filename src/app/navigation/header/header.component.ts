import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isSidebarVisible!: boolean;

  constructor(private sidebarService: SidebarService) { }

  ngOnInit(): void {
  }

  onClick(): void {
    this.sidebarService.getSidebarVisibility().subscribe( value => this.isSidebarVisible = value);
    this.sidebarService.setSidebarVisibility(!this.isSidebarVisible);
  }
}
