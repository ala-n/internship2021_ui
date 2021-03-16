import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(
    private translate: TranslateService,
    private snackBar: MatSnackBar
  ) {}

  showSnackbar(text: string): void {
    const message = this.translate.instant(text);
    const action = this.translate.currentLang === 'en' ? 'Close' : 'Закрыть';
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['snackbar']
    });
  }
}
