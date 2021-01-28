import { Component } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { ResizeService } from 'src/app/shared/services/resize.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  isListVisible = true;
  fullScreen!: boolean;
  viewSize!: number;

  private resizeSubscription!: Subscription;

  constructor(private resizeService: ResizeService) {}

  ngOnInit(): void {
    this.resizeSubscription = this.resizeService.onResize$
      .pipe(debounce(() => interval(100)))
      .subscribe((size) => {
        this.viewSize = size.innerWidth;
        this.showFullScreen();
      });
  }

  ngOnDestroy(): void {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }

  showFullScreen(): void {
    if (this.viewSize > 1023) {
      this.fullScreen = false;
      this.isListVisible = true;
    } else {
      this.fullScreen = false;
    }
  }

  toggleListView(): void {
    this.isListVisible = this.isListVisible ? false : true;
  }
}
