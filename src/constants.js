import overpassApiInitialResultData from './assets/data/initial-overpass-api-data'
import { convertOSMOverpassResultToGeoJSON } from './libs/geoJson'

// Taken from Mapbox
const AccessTokenMapboxGL = 'pk.eyJ1IjoiZW1yZWRhZ2xpIiwiYSI6ImNqMXJ3ZmEzMzAwMHkycXJ6NHBwY3k2bmUifQ.aa0YeG9FVaAV8jSP0m1Vzw';

const OverpassSearchUrl = 'https://overpass-api.de/api/interpreter?data='

const GetOverpassSearchParams = (osmKey) => {
  const bboxStr = '52.504,13.375,52.526,13.418'

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

const initialGeoJSON = convertOSMOverpassResultToGeoJSON(overpassApiInitialResultData)

const InitialState = {
  app: {},
  map: {zoom: 14},
  search: {
    geoJSON: initialGeoJSON,
  },
  center: [13.3969553, 52.5155642]
}

const SearchOSMKeys = ['landuse', 'tourism'];

export { AccessTokenMapboxGL, OverpassSearchUrl, GetOverpassSearchParams }
export { InitialState, SearchOSMKeys }
