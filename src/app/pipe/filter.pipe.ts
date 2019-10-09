import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(list: any[], filterField: string, keyword: string): any {
  if (!filterField || !keyword) {
    return list;
  }
  return list.filter(item => {
     const fieldValue = item[filterField];
     if (fieldValue.indexOf(keyword) >= 0) {
       return true;
     } else {
       return false;
     }
    });
  }

}
