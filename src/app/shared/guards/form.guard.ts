import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';

@Injectable()
export class FormGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (isNaN(+route.params.id)) {
      alert('Please, complete and confirm brand information first!');
      return false;
    }
    return true;
  }
}
