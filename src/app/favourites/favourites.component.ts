import { Component, Input, OnChanges } from '@angular/core';
import { NgStyle, NgIf } from '@angular/common';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnChanges {
  @Input() favourites: Array<any>;

  hasFavourites() {
    console.log('triggered');
    return (this.favourites.length);
  }

  ngOnChanges() {
    this.hasFavourites();
  }
}
