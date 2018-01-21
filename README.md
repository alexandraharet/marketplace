# Marketplace SPA

The app is available live at: http://alexandraharet.com/marketplace

This app was built using the following technologies:
- MVC framework: Angular 5
- CLI: Angular CLI 1.5
- UI: Bootstrap 4, mobile first (with polyfills and special CSS rules targeting IE9 to offer fallback for lack of support for flebxox in this client)
- CSS processor: SCSS

## App architecture
The app consists of three components, nested as follows
Markup: html <ItemsComponent>
                <FavouritesComponent>
            <SearchComponent>

**The ItemsComponent**: displays the availableItems and offers sorting and 'add to favourites' functionality
**The FavouritesComponent**: updates itself with the items that have been added or removed from the favourites array, in the parent (ItemsComponent)
**The SearchComponent**: applies a filter to the items array and returns an array of results, which is updated in the parent (ItemsComponent) view.

The app implements the following functionality:

### Fetching data:
- fetching an array of available items from hte provided jason file

### Pagination:
- when the app first loads, the first 5 items are displayed, and a 'Load more' button is presented at the bottom
- clicking the Load more button will cause a loader to be briefly displayed, and this will disapper once another set of 5 items (or less, is less are available) are loaded;
- when all available items are loaded on the page, the Load mopre button is hidden from view.

### Search functionality:
- when a user enters a string in the search input and either clicks the Go button or presses Enter on the keyboard, a search will be performed on the items.
- the search is implemented using the .filter methon on the array of items, and pushing into a results array only the items that have a matching property that contains the seached string.
- to avoid case-sensititity, the filter method will transform both the search term and the propery on the item to lowercase. This way, searching for 'iPhone', 'iphone' or 'IPHONE' will all return the same results.
- is the array of search results is not empty, these ites will replace the previously loaded list, in the view.
- when the user enter an empty search term, the initial items are once again loaded, and a filter operation is not performed

### Favourites functionality:
- items displayed in the view can be added to a favourites list by clicking on the 'heart' icon on each of the cards
- the favourites can be displayed by clicking on the "view your favourites" button at the top of the page.
- whem an item is added to the favourite, the hear icon on the item card becomes filled with color;
- the item can be removed from the favs by clicking on the same icon, which will now become non-filled (outline only);
- the heart icon on the 'View Favourite Itesm' button at the top will also be filled (completely white) when at least one item is added to the favourites; and it will go back to a non-filled icon (outline only) when the Favs list is empty;
- the favourites list will persists until a page refresh takes place;


### Sorting functionality
- the available items (either form the default list, of from the search results list) can be sorted using one of four criteria available (title, description, price or email).
- the method will first check which sorting criteria is used, and will apply different logis if sorting my strings or numbers.
- in the case of two items having the same property value, the order is determined by their initial order in the array (i.e. the first mathing item from the array will be the first in the sorted list as well)
- this has been exemplified in the unit test for the "price" property

## Unit tests

Some unit tests have been added as well, in particular checking:
- the successsul creation of each component
- pagination behaviour on first load and loading more pages
- sorting functionality, testing for all possible search criteria implemented in the UI
- search functionality under different assumptions (empty string, string not matchign any items, string matching items)



## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
