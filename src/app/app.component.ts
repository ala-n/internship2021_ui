import { Component, OnInit } from '@angular/core';
import { CityService } from '@shared/services/city.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'exadel-app';
  loading = true;

  constructor(private cityService: CityService) {}

  ngOnInit(): void {
    this.cityService.preload().then(() => {
      this.loading = false;
    });
  }
}
