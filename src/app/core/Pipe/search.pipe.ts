import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(files: any[], term: string): any[] {
    // Check Exit Name File OR No
    // No
    if (!term) {
    return files;
  }
  // Yes
  // Filter Data
  return files.filter((item) => {
    if (item && item.name) {
      return item.name.toLowerCase().includes(term.toLowerCase());
    }
      return false; 
    });
  }
}
