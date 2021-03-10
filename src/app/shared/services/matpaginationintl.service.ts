import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

/**
 * Utility service necessary to translate the mat-paginator
 */
@Injectable()
export class MatPaginationIntlService extends MatPaginatorIntl {
  constructor(private translate: TranslateService) {
    super();

    // React whenever the language is changed
    this.translate.onLangChange.subscribe((_event: Event) => {
      this.translateLabels();
      console.log('fire');
    });

    // Initialize the translations once at construction time
    this.translateLabels();
  }

  injectTranslateService(translate: TranslateService): void {
    this.translate = translate;

    this.translate.onLangChange.subscribe(() => {
      this.translateLabels();
    });

    this.translateLabels();
  }

  translateLabels(): void {
    this.itemsPerPageLabel = this.translate.instant('items_per_page');
    this.nextPageLabel = this.translate.instant('next_page');
    this.previousPageLabel = this.translate.instant('previous_page');
    this.changes.next(); // Fire a change event to make sure that the labels are refreshed
  }
}
