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
    this.firstPageLabel = this.translateService.instant(
      'I18N.MAT_PAGINATOR.FIRST_PAGE'
    );
    this.itemsPerPageLabel = this.translateService.instant(
      'I18N.MAT_PAGINATOR.ITEMS_PER_PAGE'
    );
    this.lastPageLabel = this.translateService.instant(
      'I18N.MAT_PAGINATOR.LAST_PAGE'
    );
    this.nextPageLabel = this.translateService.instant(
      'I18N.MAT_PAGINATOR.NEXT_PAGE'
    );
    this.previousPageLabel = this.translateService.instant(
      'I18N.MAT_PAGINATOR.PREVIOUS_PAGE'
    );
    this.changes.next(); // Fire a change event to make sure that the labels are refreshed
  }
}
