import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

/**
 * Utility service necessary to translate the mat-paginator
 */
@Injectable()
export class MatPaginationIntlService extends MatPaginatorIntl {
  constructor(private translateService: TranslateService) {
    super();

    // React whenever the language is changed
    this.translateService.onLangChange.subscribe((_event: Event) => {
      this.translateLabels();
    });

    // Initialize the translations once at construction time
    this.translateLabels();
  }

  injectTranslateService(translate: TranslateService): void {
    this.translateService = translate;

    this.translateService.onLangChange.subscribe(() => {
      this.translateLabels();
    });

    this.translateLabels();
  }

  translateLabels(): void {
    this.itemsPerPageLabel = this.translateService.instant('items_per_page');
    this.nextPageLabel = this.translateService.instant('next_page');
    this.previousPageLabel = this.translateService.instant('previous_page');
    this.changes.next(); // Fire a change event to make sure that the labels are refreshed
  }
}
