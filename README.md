## OSM Searcher

The purpose of this project is to show filtered OpenStreetMap features on the map.

User can select a "key" value and application shows OSM features on the list and on the map.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The [Overpass API](https://wiki.openstreetmap.org/wiki/Overpass_API) is used to fetch OSM data on the map.

Mapbox GL JS map is used.

React Bootstrap is used for UI framework.

## OSM Features

OSM vector data contains features and its properties. Properties are ["key"="value"] pairs.
Please check the important pairs on [Map Features](https://wiki.openstreetmap.org/wiki/Map_Features) OSM Wiki page.

## Use Cases

Actors: User, Application

### User
#### Selects an OSM key
* Users can select an OSM key
* Users can refresh the result by Search button

#### Interacts with the search results
* Users can select a search result on the list.
* Users can deselect the last selection (like toggle button)

#### Interacts with the map
* User can move, zoom on the map.

### Application
#### Shows the initial data
* To show initial data on the map, one of the API result is saved. There are 2 reasons for this:
    * To Show the initial results instantly
    * Not to use Overpass API resources unnecessarily
    * And it also speeds up development :)
* Initially, related search key is selected on the search box.

#### Makes the search
* API parameters are prepared based on the visible area on the map and selected key.
* Make API request to https://overpass-api.de/api/interpreter.
* Notes: [overpass-turbo](https://overpass-turbo.eu/) used to generate template of Overpass API params.

#### Blocks the search on some cases
* To reduce API call result size, zoom level 14 and high is allowed.

#### Shows the search results
* The API results be displayed on the list.
* The API results be also displayed on the map.

#### Displays the selected feature
* Based on the selected feature, application highlights other related features on the map.
* The map will be centered on the selected feature coordinate.
* Application also shows a popup on the map at the selected feature location.

## Faced Problems & Solutions
### API decision
I first plan to make api calls by using [Nominatim](https://wiki.openstreetmap.org/wiki/Nominatim) search api.
But in this case it is hard to categorize the results. So I decided to use the Overpass API.

### Converting OSM Data to GeoJSON
Nominatim api returns features as a geoJSON format. But Overpass API api returns data as OSM Node, Way and Relation. So [osmtogeojson](https://github.com/tyrasd/osmtogeojson) module used to convert OSM data to GeoJSON. 

### Mapbox Redux Integration
For Redux integration [@mapbox/mapbox-gl-redux](https://github.com/mapbox/mapbox-gl-redux) is used. This module added as middleware to the Redux store and a controls of Mapbox GL JS map be synced with the application state.

### Unit Tests For React & Mapbox GL JS
I found mapbox-gl-js-mock (https://github.com/mapbox/mapbox-gl-js-mock) but I took some errors might be related with version.

### Finding The Center of GeoJSON Feature
After user select a feature it is better to make it center on the map. Unfortunately, Mapbox GL JS has no lib function to get center of a geoJSON feature. That can be point, linestring, polygon or multipolygon. So [Turf Library](http://turfjs.org/docs/) used to find the center of a feature.

### Selecting Feature on The Map
Since Mapbox GL JS geoJSON feature ids should be a number, I could not make highlight effect from the map by hovering or selecting. "osmtogeojson" module generates feature ids as a string with format: 'node/XXXX'.

## Feature Works
* Full test coverage after mocking Mapbox GL JS
* Mobile view fixes
* Selecting features from map

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
