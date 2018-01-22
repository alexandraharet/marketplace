import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ItemsComponent } from './items/items.component';
import { SearchComponent } from './search/search.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { GetDataService } from './get-data.service';
import { SearchService } from './search.service';

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    SearchComponent,
    FavouritesComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [GetDataService, SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
