import { Pipe, PipeTransform } from '@angular/core';

/*
  This pipe returns hostname only
  Usage: {{ 'https://google.com' | hostname }}
  This string without protocol 'google.com'
*/

@Pipe({
  name: 'hostname'
})
export class HostnamePipe implements PipeTransform {
  transform(site: string): string | undefined {
    return site.split('://')[1];
  }
}
