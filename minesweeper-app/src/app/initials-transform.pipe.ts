import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initialsTransform'
})
export class InitialsTransformPipe implements PipeTransform {

  transform(value: string): string {
    if (value.length === 0)
      return '';

    return value.replace(/\w\S*/g, (txt => txt[0].toUpperCase() ));
  }

}
