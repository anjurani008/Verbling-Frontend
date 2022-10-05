import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  // transform(items: any[], searchTxt: string): any[] {
  //   if(!items || !items.length) return items;
  //   if(!searchTxt || !searchTxt.length) return items;
  //   return items.filter(item => {
  //     return item.viewValue.toString().toLowerCase().indexOf(searchTxt.toLowerCase()) > -1
  //   });
  // }
  transform(value: any, keys: string, term: string) {
    if (!term) {
      return value;
    }
    return (value || []).filter((item) => keys.split(',').some(key => item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key])));
  }

}
