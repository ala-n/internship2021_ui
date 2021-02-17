import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';

@Injectable()
export class FormGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (route.params.id === 'undefined') {
      alert('Please, complete and confirm brand information first!');
      return false;
    }
    return true;
  }
}
