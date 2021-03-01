import { Pipe, PipeTransform } from '@angular/core';

/*
  This pipe creates a new string by concatenating all of the elements in array, separated by commas
  Usage: {{ ['cat', 'dog'] | concat }}
  This concatenates two strings into one by commas 'cat, dog'
*/

type ConcatData = string | undefined;

@Pipe({
  name: 'concat'
})
export class ConcatPipe implements PipeTransform {
  transform(arr: ConcatData[]): string {
    return arr
      .filter((item: ConcatData) => item !== '' && item !== undefined)
      .join(', ');
  }
}
