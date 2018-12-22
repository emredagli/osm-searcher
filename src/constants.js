import overpassApiInitialResultData from './assets/data/initial-overpass-api-data'
import { convertOSMOverpassResultToGeoJSON, sortGeoJSONFeaturesByProperty } from './libs/geoJson'
import { getColorMapFromProperty, convertColorMapToColorStops } from './libs/colorMap'

// Taken from Mapbox
const AccessTokenMapboxGL = 'pk.eyJ1IjoiZW1yZWRhZ2xpIiwiYSI6ImNqMXJ3ZmEzMzAwMHkycXJ6NHBwY3k2bmUifQ.aa0YeG9FVaAV8jSP0m1Vzw';

const OverpassAPIUrl = 'https://overpass-api.de/api/interpreter';

const OverpassSearchUrl = `${OverpassAPIUrl}?data=`

const GetOverpassSearchParams = (osmKey, bbox) => {
  const bboxStr = `${bbox._sw.lat},${bbox._sw.lng},${bbox._ne.lat},${bbox._ne.lng}`

  // Query format generated from https://overpass-turbo.eu/
  return `
[out:json][timeout:25];
(
node["${osmKey}"]["name"](${bboxStr});
way["${osmKey}"]["name"](${bboxStr});
relation["${osmKey}"]["name"](${bboxStr});
);
out;
>;
out skel qt;`.replace(/\n/gm, '')
}

const AppStates = {
  LOADING: 'LOADING',
  IDLE: 'IDLE',
}

const initialSearch = 'landuse';
const initialGeoJSON = convertOSMOverpassResultToGeoJSON(overpassApiInitialResultData);
sortGeoJSONFeaturesByProperty(initialGeoJSON, initialSearch);

const colorMap = getColorMapFromProperty(initialGeoJSON, initialSearch)

const InitialState = {
  app: {status: AppStates.IDLE},
  map: {zoom: 14, bounds: null},
  search: {
    geoJSON: initialGeoJSON,
    lastSearchedKey: initialSearch,
    resultColorMap: colorMap,
    colorStops: convertColorMapToColorStops(colorMap),
    selectedFeature: null,
  },
  center: [13.3969553, 52.5155642]
}

const SearchOSMKeys = [
  'landuse',
  'tourism',
  'amenity',
  'leisure',
  'natural',
  'waterway',
  'power',
  'shop',
  'historic',
  'public_transport'
];

const AppStyle = {
  NonHighlightedColor: '#dddddd'
  // TODO: map layer constant paint properties can be defined here.
}


export { AccessTokenMapboxGL, OverpassSearchUrl, OverpassAPIUrl, GetOverpassSearchParams }
export { InitialState, SearchOSMKeys, AppStates, AppStyle }
