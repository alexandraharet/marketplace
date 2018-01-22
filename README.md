# Marketplace SPA

The app is available live at: http://alexandraharet.com/marketplace

This app was built using the following technologies:
- MVC framework: Angular 5
- CLI: Angular CLI 1.5
- UI: Bootstrap 4, mobile first (with polyfills and special CSS rules targeting IE9 to offer fall-back for lack of support for flexbox in this client)
- CSS processor: SCSS

## App architecture
The app consists of three components (nested as depicted below), and two services (get-data.service and search.service).

```
<ItemsComponent>
    <FavouritesComponent></FavouritesComponent>
    <SearchComponent></SearchComponent>
</ItemsComponent>
```

**The ItemsComponent**: displays the availableItems and offers sorting and 'add to favourites' functionality
**The FavouritesComponent**:
- updates itself with the items that have been added or removed from the favourites array, in the parent (ItemsComponent);
- allows the user to perform a search on the favourites items
- allows the user to remove items from the favourites list
**The SearchComponent**:
- calls the search service and updates the availableItems, with the returned results, in the parent (ItemsComponent) view.

The app implements the following functionality:

### Fetching data:
- fetching an array of available items from the provided jason file (via the get-data.service)

### Pagination:
- when the app first loads, the first 5 items are displayed, and a 'Load more' button is presented at the bottom
- clicking the Load more button will cause a loader to be briefly displayed, and this will disappear once another set of 5 items (or less, is less are available) are loaded;
- when all available items are loaded on the page, the Load more button is hidden from view.

### Search functionality:
- when a user enters a string in the search input and either clicks the Go button or presses Enter on the keyboard, a search will be performed on the items.
- the search is implemented using the .filter method on the array of items, and pushing into a results array only the items that have a matching property that contains the seached string.
- to avoid case-sensitivity, the filter method will transform both the search term and the property on the item to lowercase. This way, searching for 'iPhone', 'iphone' or 'IPHONE' will all return the same results.
- is the array of search results is not empty, these items will replace the previously loaded list, in the view.
- when the user enter an empty search term, the initial items are once again loaded, and a filter operation is not performed

### Favourites functionality:
- items displayed in the view can be added to a favourites list by clicking on the 'heart' icon on each of the cards
- the View Favourite Items button is sticky to the top of the page, for easy access even when the user scrolls down
- the favourites can be displayed by clicking on the "view your favourites" button at the top of the page.
- whem an item is added to the favourite, the hear icon on the item card becomes filled with color;
- the item can be removed from the favs by clicking on the same icon, which will now become non-filled (outline only);
- the heart icon on the 'View Favourite Items' button at the top will also be filled (completely white) when at least one item is added to the favourites; and it will go back to a non-filled icon (outline only) when the Favs list is empty;
- the favourites list will persists until a page refresh takes place;
- similar to the main search, the user can search his list of favourites and if a results is found, the favourites list will be updated with the result, otheriwse a 'no items found' error message is displayed
- triggering a search with an empty string will revert back to showing all favourite items

### Sorting functionality
- the available items (either form the default list, of from the search results list) can be sorted using one of four criteria available (title, description, price or email).
- the method will first check which sorting criteria is used, and will apply different logic if sorting by strings or numbers.
- in the case of two items having the same property value, the order is determined by their initial order in the array (i.e. the first matching item from the array will be the first in the sorted list as well)
- this has been exemplified in the unit test for the "price" property

## Unit tests

Some unit tests have been added as well, in particular checking:
- the successful creation of each component
- pagination behaviour on first load and loading more pages
- sorting functionality, testing for all possible search criteria implemented in the UI
- search functionality under different assumptions (empty string, string not matching any items, string matching items)



## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
