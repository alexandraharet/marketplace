import { Component, Input } from '@angular/core';
import { NgStyle, NgIf } from '@angular/common';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent {
  @Input() favourites: Array<any>;

  hasFavourites() {
    return (this.favourites.length);
  }
}
