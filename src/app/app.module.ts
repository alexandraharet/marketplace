import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ItemsComponent } from './items/items.component';
import { SearchComponent } from './search/search.component';
import { SearchPipe } from './search/search.pipe';
import { FavouritesComponent } from './favourites/favourites.component';
import { DataService } from './data.service';

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    SearchComponent,
    SearchPipe,
    FavouritesComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
