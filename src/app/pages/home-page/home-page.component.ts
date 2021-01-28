import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  isListVisible = true;

  toggleListView(): void {
    this.isListVisible = this.isListVisible ? false : true;
  }
}
