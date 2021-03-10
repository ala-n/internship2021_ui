import { Component, OnDestroy, OnInit } from '@angular/core';
import { Offer } from '@shared/models/offer';
import { FilterService } from '@shared/services/filter.service';
import { LocationService } from '@shared/services/location.service';
import { TagsService } from '@shared/services/tags.service';
import { Observable } from 'rxjs';
import { skip } from 'rxjs/operators';

@Component({
  selector: 'app-bookmarks-page',
  templateUrl: './bookmarks-page.component.html',
  styleUrls: ['./bookmarks-page.component.scss']
})
export class BookmarksPageComponent implements OnInit, OnDestroy {
  offers$!: Observable<Offer[]>;
  city!: string;

  constructor(
    public locationService: LocationService,
    private tagsService: TagsService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.filterService.getAllBookamrks();

    this.tagsService.tag$.pipe(skip(1)).subscribe((tag) => {
      this.filterService.filter({ tag });
    });

    this.offers$ = this.filterService.resultList$;
    this.offers$.subscribe(
      () => (this.city = this.filterService.filterCfg.city || '')
    );
  }

  ngOnDestroy(): void {
    this.filterService.allListOffers();
  }
}
