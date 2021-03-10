import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { AlertService } from '@shared/services/alert.service';

@Injectable()
export class FormGuard implements CanActivate {
  constructor(private alertService: AlertService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (route.params.id === 'undefined') {
      this.alertService.showSnackbar('new_brand_empty_alert');
      return false;
    }
    return true;
  }
}
