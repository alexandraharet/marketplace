import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { NgStyle, NgIf } from '@angular/common';
import { SearchService } from '../search.service';

@Component({
    selector: 'app-favourites',
    templateUrl: './favourites.component.html',
    styleUrls: ['./favourites.component.scss']
})

export class FavouritesComponent implements OnInit {
    @Input() items = [];
    @Output() remove = new EventEmitter<Object>();
    availableItems: Array<any>;
    visibleItems: Array<any>;

    constructor(
        public searchService: SearchService
    ) { }

    hasFavourites() {
        return (this.items.length);
    }

    getResults() {
        this.visibleItems = this.searchService.getResults();
    }

    removeFromFavourites(item) {
        let index = this.items.indexOf(item);
        this.items.splice(index, 1);
        this.remove.emit(item);
    }

    ngOnInit() {
        this.visibleItems = this.items;
    }
}
