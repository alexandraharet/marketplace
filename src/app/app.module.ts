import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ItemsComponent } from './items/items.component';
import { SearchComponent } from './search/search.component';
import { SearchPipe } from './search/search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    SearchComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
