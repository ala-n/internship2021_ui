import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vendor-nav',
  templateUrl: './vendor-nav.component.html',
  styleUrls: ['./vendor-nav.component.scss']
})
export class VendorNavComponent implements OnInit, OnDestroy {
  vendorId = '';
  subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const [route] = this.route.children.splice(-1);
    if (!route) return;
    const observer = route.params.subscribe((params) => {
      this.vendorId = params.id;
    });
    this.subscriptions.push(observer);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subs) => subs.unsubscribe());
  }
}
