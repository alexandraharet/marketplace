import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search'
})

export class SearchPipe implements PipeTransform {

    transform(items: any[], searchString: string): any[] {
        console.log(searchString);

        if (!items) {
            console.log('1');
            return [];
        }
        if (!searchString) {
            console.log('2');
            return items;
        }

        searchString = searchString.toLowerCase();
        // return
        items.filter(it => {
            // return
             it.toLowerCase().includes(searchString);
        });

        console.log(items);
    }
}
