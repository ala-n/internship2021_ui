import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class FormGuard implements CanActivate {
  constructor(
    private translate: TranslateService,
    private snackBar: MatSnackBar
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (isNaN(+route.params.id)) {
      this.showSnackbar();
      return false;
    }
    return true;
  }

  showSnackbar(): void {
    const message =
      this.translate.currentLang === 'en'
        ? 'Please, complete and save brand information first!'
        : 'Пожалуйста, сначала заполните и сохраните информацию о бренде!';
    const action = this.translate.currentLang === 'en' ? 'Close' : 'Закрыть';
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['snackbar']
    });
  }
}
