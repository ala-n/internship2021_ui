import { Component, OnInit } from '@angular/core';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isSidebarVisible!: boolean;

  constructor(private sidebarService: SidebarService) { }

  ngOnInit(): void {
    this.sidebarService.getSidebarVisibility().subscribe( value => {
      this.isSidebarVisible = value;
    });
  }

  onClick(): void {
    if (this.isSidebarVisible) this.sidebarService.setSidebarVisibility(!this.isSidebarVisible);
  }
}
