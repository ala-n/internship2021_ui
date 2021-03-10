import { Component, OnDestroy, OnInit } from '@angular/core';
import { Offer } from '@shared/models/offer';
import { FilterService } from '@shared/services/filter.service';
import { LocationService } from '@shared/services/location.service';
import { TagsService } from '@shared/services/tags.service';
import { Observable } from 'rxjs';
import { skip } from 'rxjs/operators';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {
  offers$!: Observable<Offer[]>;
  city!: string;

  constructor(
    public locationService: LocationService,
    private tagsService: TagsService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.filterService.getAllHistory();

    this.locationService.city$.subscribe((city) => {
      this.filterService.filter({ city });
      this.city = city;
    });

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
